<template>
    <div class="ratio-box" :style="{ paddingBottom: `${100 * (dy / dx)}%` }">
        <slot v-if="multiChild" />
        <div v-else><slot /></div>
    </div>
</template>
<script>
export default {
    props: {
        dx: {
            type: Number,
            default: 1,
            validator: value => value !== 0,
        },
        dy: {
            type: Number,
            default: 1,
        },
        childClass: {
            type: [String, Object, Array],
            default: '',
        },
        multiChild: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style lang="scss">
.ratio-box {
    width: 100%;
    position: relative;
    > * {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>
