<template>
    <div>
        <div class="header">
            <span v-if="open" @click="open = !open">&#x25B2; Collapse</span>
            <span v-else @click="open = !open">&#x25B2; Expand</span>
        </div>
        <slot v-if="open">
            <!-- All children elements will be set here -->
            <!-- You can put new elements here -->
        </slot>
    </div>
</template>

<script>
export default {
  name: 'CollapsibleSection',
  data() {
    return { open: true };
  },
};
</script>

<style scoped>
    .header{
        background-color: gray;
        padding: 3px;
        cursor: pointer;
    }
</style>
