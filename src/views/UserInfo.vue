<template>
    <div>
        <span v-if="!readMoreActivated">{{longText.slice(0, 200)}}   </span>
        <a class="" v-if="!readMoreActivated" @click="activateReadMore" >
        Read more...
        </a>
        <span v-if="readMoreActivated" v-html="longText"></span>
    </div>
</template>
<script>
export default {
    name: "Readmore",
    data(){
        return {
                longText: `Brown skin girl
                Your skin just like pearls
                The best thing in the world
                Never trade you for anybody else
                Singin' brown skin girl
                Your skin just like pearls
                The best thing in the world
                I never trade you for anybody else, singin'
                She said she really grew up poor like me
                yeah
                So while I may not pretty boy, your heart is amiss
                Play it like a villain 'cause she caught in a wave
                Tonight I am walkin' away`,
                readMoreActivated: false
    }
},
methods: {
    activateReadMore(){
        this.readMoreActivated = true;
    },
}
}
</script>