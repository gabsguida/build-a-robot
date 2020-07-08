<template>
    <div>
        <h1>{{ part.title }}</h1>
        <div>
            {{ part.description }}
        </div>
    </div>
</template>

<script>
import getPartsMixins from './get-parts-mixin';

export default {
  name: 'PartInfo',
  mixins: [getPartsMixins],
  props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  computed: {
    part() {
      const { partType, id } = this;
      // put plus sign to convert string to number then the comparison will work
      // partType will find the type
      // id used to compare in all array and find the robot information
      // this infos (partType and id) are get from $route in RobotPartsSelector component
      return this.parts[partType].find((part) => part.id === +id);
    },
  },
};
</script>
