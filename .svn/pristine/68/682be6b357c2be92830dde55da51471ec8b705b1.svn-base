<template>
    <view class='carList'>
        <view class="carList_item">
            <view class="carList_item_left">
                <view class="carList_item_left_title">
                    <view class="name">车辆信息</view>
                    <!-- <view class="tag"><u-tag text="默认" plain size="mini"> </u-tag></view> -->
                    <view class="tag"><u-tag :text="carData.carType" plain size="mini"> </u-tag></view>
                </view>
                <view class="carList_item_left_content"> {{ carData.carNo }}</view>
            </view>
            <view class="carList_item_right">
                <u--image :showLoading="true" :src="require('@/subpackageA/static/img/car.png')" width="240rpx"
                    height="114rpx" @click="click" mode="widthFix"></u--image>
            </view>
        </view>
        <view class="carList_manipulate">
            <view class="left" @click="checkboxChange">
                <!-- <view class="checkbox">
                    <view class="checkbox_choose" v-show="!value"></view>
                    <view class="checkbox_unselected" v-show="value">
                        <u--image :showLoading="true" :src="require('@/subpackageA/static/img/yes.png')" width="48rpx"
                            height="48rpx" @click="click" mode="widthFix"></u--image>
                    </view>
                </view>
                <view>设为默认</view> -->
            </view>
            <view class="right" @click="delCar">修改</view>
        </view>
    </view>
</template>
<script>
export default {
    name: 'carList',
    props: {
        value: {
            type: Boolean,
            default: false,
        },

        carData: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            columns: ["轿车", "私家车", "出租车", "小型货车", "客车", "大货车", "中大型客车", "公交车", "工程车", "驾校车",],
        };
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    beforeCreate() { },
    created() { },
    beforeMount() { },
    mounted() { },
    methods: {
        delCar() {
            this.$emit('delCar', this.carData);
        },
        click() { },
        checkboxChange() {
            this.$emit('input', !this.value);
            this.$emit('click');
        },
    },
    beforeUpdate: {},
    onReachBottom: {},
    watch: {},
};
</script>
<style lang="scss">
.carList {
    padding: 24rpx 24rpx 30rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0rpx 8rpx 8rpx 0rpx #EBEDF0;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin-bottom: 32rpx;

    .carList_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #E1E3E6;
        margin-bottom: 16rpx;
        padding-bottom: 16rpx;
        box-sizing: border-box;

        .carList_item_left {
            .carList_item_left_title {
                display: flex;
                align-items: center;
                margin-bottom: 24rpx;

                .name {
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #2E3033;
                    line-height: 33rpx;
                    margin-right: 24rpx;
                }

                .tag {}
            }

            .carList_item_left_content {
                font-family: PingFang SC, PingFang SC;
                font-weight: 500;
                font-size: 36rpx;
                color: #14161A;
                line-height: 42rpx;
            }
        }

        .carList_item_right {
            height: fit-content;
        }
    }

    .carList_manipulate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #14161A;
        line-height: 28rpx;

        .left {
            display: flex;
            align-items: center;

            .checkbox {
                margin-right: 16rpx;
                width: 48rpx;
                height: 48rpx;
                display: flex;
                justify-content: center;
                align-items: center;

                view {
                    width: 48rpx;
                    height: 48rpx;
                    border-radius: 50%;
                }

                .checkbox_choose {
                    width: 43rpx;
                    height: 43rpx;
                    border: 2rpx solid #AFB0B2;
                }

                .checkbox_unselected {}
            }
        }

        .right {}
    }
}
</style>