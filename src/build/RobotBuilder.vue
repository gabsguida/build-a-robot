/* eslint-disable no-restricted-globals */
<template>
    <div v-if="availableParts" class="content">
            <div class="preview">
                <CollapsibleSection>
                    <div class="preview-content">
                        <div class="top-row">
                            <img :src="selectRobot.head.src"/>
                        </div>
                        <div class="middle-row">
                            <img :src="selectRobot.leftArm.src" class="rotate-left"/>
                            <img :src="selectRobot.torso.src"/>
                            <img :src="selectRobot.rightArm.src" class="rotate-right"/>
                        </div>
                        <div class="bottom-row">
                            <img :src="selectRobot.base.src"/>
                        </div>
                    </div>
                </CollapsibleSection>
                <button class="add-to-cart" @click="addToCart">Add to cart</button>
            </div>
        <div class="top-row">
            <!-- position esta como props e está sendo atribuida em :class="position" -->
            <RobotPartsSelector :parts="availableParts.heads"
                position="top"
                @partSelected="part => selectRobot.head=part" />
        </div>
        <div class="middle-row">
           <RobotPartsSelector :parts="availableParts.arms"
                position="left"
                @partSelected="part => selectRobot.leftArm=part" />
           <RobotPartsSelector :parts="availableParts.torsos"
                position="center"
                @partSelected="part => selectRobot.torso=part" />
           <RobotPartsSelector :parts="availableParts.arms"
                position="right"
                @partSelected="part => selectRobot.rightArm=part" />
        </div>
        <div class="bottom-row">
            <RobotPartsSelector :parts="availableParts.bases"
                position="bottom"
                @partSelected="part => selectRobot.base=part" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import RobotPartsSelector from './RobotPartsSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';

export default {
  name: 'RobotBuilder',
  created() {
    /* dispatching getParts action. For that we use created method,
   so as soon the page is created the action will be dispatched
    One way to dispatch: this.$store.dispatch('robots/getParts')
   */
    // Another way to dispatch is using mapActions
    this.getParts();
  },
  beforeRouteLeave(to, from, next) {
    // send a message if nothing was added to the cart
    if (this.addedToCart) {
      next(true);
    } else {
      /* eslint no-alert: 0 */
      /* eslint no-restricted-globals: 0 */
      const response = confirm('You have not added your robot to your cart, are you sure you want leave?');
      next(response);
    }
  },
  components: { RobotPartsSelector, CollapsibleSection },
  data() {
    return {
      addedToCart: false,
      selectRobot: {
        head: {},
        leftArm: {},
        torso: {},
        rightArm: {},
        base: {},
      },
    };
  },
  computed: {
    // acessing parts from robots state using mapState
    ...mapState('robots', { availableParts: 'parts' }),
    /*
      acessing the state when you're not using mapState
      availableParts() {
      return this.$store.state.robots.parts;
    }
    */
    saleBorderClass() {
      return this.selectRobot.head.onSale ? 'sale-border' : '';
    },
  },
  methods: {
    // getParts and addRobotToCart actions belongs to robots module
    ...mapActions('robots', ['getParts', 'addRobotToCart']),
    addToCart() {
      const robot = this.selectRobot;
      const cost = robot.head.cost + robot.leftArm.cost
        + robot.torso.cost + robot.rightArm.cost + robot.base.cost;
        /*
        dispatching the addRobotToCart action (belongs to robots module)
          this.$store.dispatch('robots/addRobotToCart', { ...robot, cost })
      */
      // using mapActions
      this.addRobotToCart({ ...robot, cost })
        // redirecting the ShoppingCart path after adding a robot to the Cart
        .then(() => this.$router.push('/cart'));
      this.addedToCart = true;
    },
  },
};
</script>

<style scoped>
.content{
    position: relative;
}

/* robot preview */
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 170px;
  height: 170px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}

/* add to cart button */
.add-to-cart{
    position: absolute;
    width: 170px;
    padding: 10px;
}

/* robot parts */
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.part img {
  width:165px;
}

.sale-border{
    border: 3px solid red;
}

.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name{
    position: absolute;
    top: -25px;
    text-align: center;
    width: 100%;
}

.sale{
    color: red;
}

.cost{
    text-align: right;
}

/* Cart */
td, th{
    text-align: left;
    padding: 5px;
    padding-right: 20px;
}
</style>
