<template>
    <b-nav-item :to="to" class="nav-item-icon">
        <div v-if="icon !== ''" class="icon">{{ icon }}</div>
        <div v-else-if="image !== ''" class="icon">
            <image-
                class="m-2"
                :class="[{ 'rounded-circle': circle }, imageClass]"
                :source="image"
                height="24"
                width="24"
            />
        </div>
        <div v-if="text !== ''" :class="textClass">{{ text }}</div>
    </b-nav-item>
</template>
<script>
export default {
    props: {
        to: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
        imageWidth: {
            type: Number,
            default: 0,
        },
        imageHeight: {
            type: Number,
            default: 0,
        },
        imageClass: {
            type: String,
            default: '',
        },
        circle: {
            type: Boolean,
            default: false,
        },
        textClass: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
    },
};
</script>
