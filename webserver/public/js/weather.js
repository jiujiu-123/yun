window.addEventListener("load", () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    setTimeout(function () {
        option = {
            title: {
                text: '云南气温图'
            },
            legend: {},
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            dataset: {
                source: [
                    ['product', '昆明', '曲靖', '大理', '丽江', '普洱', '西双版纳', '香格里拉'],
                    ['最低气温'],
                    ['最高气温']
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {
                type: 'value',
                min: 0,
                max: 40,
                interval: 20
            },
            grid: { top: '55%' },
            series: [
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    emphasis: {
                        focus: 'self'
                    },
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    encode: {
                        itemName: 'product',
                        value: '2012',
                        tooltip: '2012'
                    }
                }
            ]
        };
        myChart.on('updateAxisPointer', function (event) {
            const xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                const dimension = xAxisInfo.value + 1;
                myChart.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });
        // myChart.setOption(option);
        //使用axios异步请求高德天气详情API
        // 高德城市编码
        let citycode = [530100, 530300, 532900, 530700, 530800, 532800, 533401]
        let index = 0
        let arr1 = ['最低气温']
        let arr2 = ['最高气温']
        /*
            使用函数返回多个Promise存储再数组中
        */
        function database(citycode, index, option) {
            let promiseArr = [];
            for (let i = 0; i < citycode.length; i++) {
                promiseArr.push(axios({
                    url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${citycode[index++]}&key=e704edef25d70309a092d96a8738728a&extensions=all`,
                    method: "get"
                }));
            }
            Promise.all(promiseArr).then((responses) => {
                for(let i=0; i<responses.length; i++){
                    let response = responses[i];
                    // console.log(response.data.forecasts);
                    // console.log(option.dataset.source);
                    // console.log(response.data.forecasts[0].casts[0].daytemp);
                    // console.log(response.data.forecasts[0].casts[0].nighttemp);
                    arr2.push(response.data.forecasts[0].casts[0].daytemp)
                    arr1.push(response.data.forecasts[0].casts[0].nighttemp)
                    option.title.text = `云南${response.data.forecasts[0].casts[0].date}日各地气温`
                }
                option.dataset.source[2] = arr2
                option.dataset.source[1] = arr1
                
                console.log(12);
                option && myChart.setOption(option);
            })
        }
        database(citycode, index, option)
    });
    //设置echarts
    option && myChart.setOption(option);
})