<template>
  <div class="part" :class="position">
    <img @click="showPartInfo" :src="selectedPart.src" title="arm"/>
    <button @click="selectPreviousPart()" class="prev-selector"></button>
    <button @click="selectNextPart()" class="next-selector"></button>
    <span class="sale" v-pin="{bottom: '5px', right: '5px'}"
      v-show="selectedPart.onSale">Sale!</span>
  </div>
</template>

<script>
// import pinDirective from '../shared/pin-directive';

function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

export default {
  name: 'RobotPartsSelector',
  /* {directiveName: source}
  directives: { pin: pinDirective }, */
  props: {
    parts: {
      type: Array,
      required: true,
    },
    position: {
      type: String,
      required: true,
      validator(value) {
        return ['left', 'right', 'bottom', 'center', 'top'].includes(value);
      },
    },
  },
  data() {
    return { selectedPartIndex: 0 };
  },
  computed: {
    selectedPart() {
      return this.parts[this.selectedPartIndex];
    },
  },
  created() {
    // this method will be ready to be use when the app is loaded.
    /* As we are seting a default robot (in selectedPartIndex=0),
    errors as NaN will be avoided in the cart. */
    this.emitSelectedPart();
  },
  updated() {
    this.emitSelectedPart();
  },
  methods: {
    showPartInfo() {
      // Use of the router in code, without using <router-link>
      // passing the params
      this.$router.push({
        name: 'Parts',
        params: {
          // as setted in router, the id must be a number
          id: this.selectedPart.id,
          partType: this.selectedPart.type,
        },
      });
    },
    emitSelectedPart() {
      this.$emit('partSelected', this.selectedPart);
    // It will emit an event when a robot part is chosen
    // The first param is the name of the event
    // The second params is the object that will be selected
    // Use it as @partSelected=""
    },
    selectNextPart() {
      this.selectedPartIndex = getNextValidIndex(
        this.selectedPartIndex,
        this.parts.length,
      );
      this.emitSelectedPart();
    },
    selectPreviousPart() {
      this.selectedPartIndex = getPreviousValidIndex(
        this.selectedPartIndex,
        this.parts.length,
      );
      this.emitSelectedPart();
    },
  },
};

</script>

<style scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.sale {
  color: white;
  background-color: red;
  padding: 3px;
}
.part-title {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: red;
  padding-top: 5px;
  top: -25px;
}
.part img {
  width:165px;
  cursor: pointer;
}
.top {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.bottom {
  border-top: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
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
.left .prev-selector:after,  .right .prev-selector:after{
  content: '\25B2'
}
.left .next-selector:after, .right .next-selector:after {
  content: '\25BC'
}
.top .prev-selector:after, .bottom .prev-selector:after, .center .prev-selector:after{
  content: '\25C4'
}
.top .next-selector:after, .bottom .next-selector:after, .center .next-selector:after{
  content: '\25BA'
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
.highlight {
  border: 1px solid red;
}
</style>
