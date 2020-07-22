<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>


        <div class="panel">
            <div class="panel__hexagon panel__hexagon--shadow">
                <div class="panel__hexagon-left panel__hexagon-item"></div>
                <div class="panel__hexagon-center panel__hexagon-item"></div>
                <div class="panel__hexagon-right panel__hexagon-item"></div>
            </div>
            <div class="panel__hexagon">
                <div class="panel__hexagon-left panel__hexagon-item"></div>
                <div class="panel__hexagon-center panel__hexagon-item"></div>
                <div class="panel__hexagon-right panel__hexagon-item"></div>
            </div>
            <div class="panel__mark"></div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld
        }
    }
</script>
<style>

    .panel {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 100px;
    }

    .panel__mark {
        width: 300px;
        height: 300px;
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
        transition: box-shadow .6s;

        /*box-shadow: 0 0 15px rgba(0, 0, 0, .61)*/
    }

    .panel__hexagon {
        width: 60px;
        height: 104px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -30px;
        z-index: 2;
    }

    .panel__hexagon-item {
        width: 100%;
        height: 100%;
        background: blue;
        position: absolute;
        top: 0;
        left: 0;
    }

    .panel__hexagon--shadow {
        z-index: 0;
    }

    .panel__hexagon--shadow .panel__hexagon-item {
        background: transparent;
        transition: box-shadow .3s;
        /*box-shadow: 0 0 15px rgba(0, 0, 0, .61)*/
    }


    .panel__hexagon-left {
        transform: rotate(-60deg);
    }

    .panel__hexagon-right {
        transform: rotate(60deg);

    }


    .panel:hover .panel__mark,
    .panel:hover .panel__hexagon--shadow .panel__hexagon-item {
        box-shadow: 0 0 15px rgba(0, 0, 0, .61)
    }


    /*.panel__hexagon-left{*/
    /*  width: 0;*/
    /*  height: 0;*/
    /*  position: absolute;*/
    /*  left: -20px;*/
    /*  top: 0;*/
    /*  border-right: 20px solid orange;*/
    /*  border-top: 40px solid transparent;*/
    /*  border-bottom: 40px solid transparent;*/
    /*}*/
    /*.panel__hexagon-right{*/
    /*  width: 0;*/
    /*  height: 0;*/
    /*  position: absolute;*/
    /*  right: -20px;*/
    /*  top: 0;*/
    /*  border-left: 20px solid orange;*/
    /*  border-top: 40px solid transparent;*/
    /*  border-bottom: 40px solid transparent;*/
    /*}*/
</style>
