<template>
  <div class="select">
    <div :class="['current-select', selectFlag ? 'now-select' : '']" @click.stop="changeSelectFlag">{{
      selectData[currentIndex] ? selectData[currentIndex]['name'] : '' }}
    </div>
    <transition name="test-in">
      <ul class="select-list custom-scroll" v-show="selectFlag" @click.stop>
        <li class="select-list-inner" v-for="(value, index) of selectData" :key="index" @click="select(value, index)">
          <span>{{  value['name'] }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
    export default {
        name: 'component-select',
        props: {
            selectData: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            firstIndex: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                selectFlag: false,
                currentIndex: -1,
                childValue: 1,
            };
        },
        methods: {
            changeSelectFlag(event) {
                this.selectFlag = !this.selectFlag;
            },
            listenerHandler(event) {
                this.selectFlag = false;
            },
            select(value, index) {
                this.selectFlag = false;
                if (index === this.currentIndex) return;
                this.currentIndex = index;
                switch (value.name) {
                    case '文成县':
                        this.childValue = 1;
                        this.$emit('childByValue', this.childValue);
                        break;
                    case '苍南县':
                        this.childValue = 2;
                        this.$emit('childByValue', this.childValue);
                        break;
                }
                this.$emit('select-finish', value);
            }
        },
        created() {
            this.currentIndex = this.firstIndex;
            document.body.addEventListener('click', this.listenerHandler);
        },
        beforeDestroy() {
            document.body.removeEventListener('click', this.listenerHandler);
        },
        watch: {
            selectData() {
                console.log(this.currentIndex)
                this.currentIndex = this.firstIndex;
            }
        }
    }
</script>
<style scoped>
  .select {
    position: relative;
    color: rgb(119, 119, 119);
    padding: .02rem .2rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .current-select {
    width: 100%;
    height: 100%;
    font-size: .29rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Source Han Sans CN;
  }

  .current-select::after {
    display: inline-block;
    content: "";
    width: .2rem;
    height: .2rem;
    margin-left: .1rem;
    background: url('../../static/empindex/select_bottom.png') center center no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }

  .now-select {
    color: #53D1FF;
  }

  .now-select::after {
    background: url('../../static/empindex/select_top.png') center center no-repeat;
    background-size: 100% 100%;
  }

  .select-list {
    position: absolute;
    width: 100%;
    max-height: 4.14rem;
    background-color: #fff;
    top: 100%;
    left: 0;
    transform: translateY(10px);
    list-style: none;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  }

  .select-list-inner {
    position: relative;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
    font-size: .29rem;
    cursor: pointer;
    color: rgb(153, 153, 153);
  }

  .select-list-inner span {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }

  .select-list-inner:first-child::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: -4px;
    right: 10px;
    border-style: solid;
    transform: rotate(135deg);
    border-width: 6px;
    border-color: transparent transparent #fff #fff;
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }

  .select-list-inner:active {
    background-color: #53D1FF;
    color: #fff;
  }

  .test-in-enter-active {
    animation: bounce-in .5s ease;
  }

  .test-in-leave-active {
    animation: bounce-in .5s ease reverse;
  }

  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: translate(-20%, 10px);
    }
    50% {
      opacity: 0.5;
      transform: translate(5%, 10px);
    }
    100% {
      opacity: 1;
      transform: translate(0, 10px);
    }
  }
</style>
