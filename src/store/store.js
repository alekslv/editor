import Vuex from 'vuex'
import Vue from 'vue'
import router from '@/router/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /*
        QuoteDay: {
            photo: '/img/quote_day.png',
            width:1799,
            heigth: 1800,
            fontFamily:['Montserrat'],
            arrText: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Цитата дня',
                    fill: "#000",
                    fontSize: 70,
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 600,
                        y: 270
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: `Наша власть привыкла продвигаться \nдальше засчет очернения \nпредыдущей. Ельцин должен был \nчморить Горбачева, Горбачев — \nБрежнева. Единственная сакральная \nличность — это Ленин, его не \nсмеет трогать никто, потому что он основа \nи начало. Критика Ельцина при Путине \nочень даже поддерживается \nгосударственными СМИ. Или, если \nболее интеллигентно, хотя бы сказать: \n"У меня критичное отношение к \nЕльцину".`,
                    fontSize: 47,
                    fill: "#000",
                    fontWeight: 'normal',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 150,
                        y: 500
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Григорий\n' +
                        'Турчин',
                    fill: "#ffffff",
                    fontSize: 56,
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 1260,
                        y: 820
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'депутат Псковской  \nгородской думы',
                    fill: "#ffffff",
                    fontSize: 40,
                    fontWeight: 'normal',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 1260,
                        y: 1030
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Из интервью\n' +
                        'интернет-порталу\n' +
                        '«Псковская Лента\n' +
                        ' Новостей»,\n' +
                        '17 сентября 2019 года',
                    fill: "#ffffff",
                    fontSize: 40,
                    fontWeight: 'normal',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 1260,
                        y: 1200
                    }
                },
            ],
            upload: false
        },
         */
        QuoteDayphoto: {
            photo: '/img/quote_day.png',
            width: 1799,
            heigth: 1800,
            arrText: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Цитата дня',
                    fill: "#000",
                    fontSize: 70,
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 600,
                        y: 270
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: `Наша власть привыкла продвигаться \nдальше засчет очернения \nпредыдущей. Ельцин должен был \nчморить Горбачева, Горбачев — \nБрежнева. Единственная сакральная \nличность — это Ленин, его не \nсмеет трогать никто, потому что он основа \nи начало. Критика Ельцина при Путине \nочень даже поддерживается \nгосударственными СМИ. Или, если \nболее интеллигентно, хотя бы сказать: \n"У меня критичное отношение к \nЕльцину".`,
                    fontSize: 47,
                    fill: "#000",
                    fontWeight: 'normal',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 150,
                        y: 500
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Григорий\n' +
                        'Турчин',
                    fill: "#ffffff",
                    fontSize: 56,
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 1260,
                        y: 820
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'депутат Псковской  \nгородской думы',
                    fill: "#ffffff",
                    fontSize: 40,
                    fontWeight: 'normal',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 1260,
                        y: 1030
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Из интервью\n' +
                        'интернет-порталу\n' +
                        '«Псковская Лента\n' +
                        ' Новостей»,\n' +
                        '17 сентября 2019 года',
                    fill: "#ffffff",
                    fontSize: 40,
                    fontWeight: 'normal',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 1260,
                        y: 1200
                    }
                },
            ],
            fontFamily:['Montserrat'],
            upload: {
                widthUpload: 450,
                heigthUpload: 450,
                positionUpload: {
                    x: 1195,
                    y: 345
                },

            }
        },
        NumberDay: {
            photo: '/img/number_day.png',
            text: 'Цифра дня',
            width: 1800,
            heigth: 1200,
            fontFamily:['GothamPro','Montserrat'],
            arrText: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Цифра дня  ',
                    fill: "#000",
                    fontSize: 53,
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 234,
                        y: 210
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: '5555 \nрубля* ',
                    fill: "#000",
                    fontSize: 140,
                    fontWeight: 'normal',
                    fontFamily: 'GothamPro',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 234,
                        y: 400
                    }
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'В том же периоде 2019 года \nцифра была выше: 5381 рубль. ',
                    fill: "#000",
                    fontSize: 36,
                    fontWeight: 'normal',
                    fontFamily: 'GothamPro',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 300,
                        y: 890
                    }
                },

                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Средний штраф по делам \n' +
                        'о семейно-бытовом \n' +
                        'насилии \n' +
                        'в первой половине \n' +
                        '2020 года, подсчитала \n' +
                        '«Зона права».',
                    fill: "#fff",
                    fontSize: 46,
                    fontWeight: 'normal',
                    fontFamily: 'GothamPro',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 1070,
                        y: 440
                    }
                },
                /*
                {
                    id: Math.random().toString(36).substr(2, 9),
                    text: 'Начните писать ',
                    fill: "#fff",
                    fontSize: 46,
                    fontWeight: 'normal',
                    fontFamily: 'GothamPro',
                    fontStyle: 'normal',
                    textAlign: 'left',
                    underline: false,
                    linethrough: false,
                    position: {
                        x: 1070,
                        y: 440
                    }
                },
                 */

            ],
            upload: false
        },
    },
    getters: {},
    mutations: {
        setData(state, data) {
            state[data.route].arrText[data.index].text = data.text;
            state[data.route].arrText[data.index].fontSize = data.fontSize;
            state[data.route].arrText[data.index].fontWeight = data.fontWeight;
            state[data.route].arrText[data.index].fontStyle = data.fontStyle;
            state[data.route].arrText[data.index].fontFamily = data.fontFamily;
            state[data.route].arrText[data.index].underline = data.underline;
            state[data.route].arrText[data.index].linethrough = data.linethrough;
        },
        setCoord(state, data) {
            state[router.currentRoute.name].arrText.forEach((element, index) => {
                if (element.id == data.id) {
                    state[router.currentRoute.name].arrText[index].position.x = data.x / data.scaleFactor;
                    state[router.currentRoute.name].arrText[index].position.y = data.y / data.scaleFactor;
                }
            });
        }
    },
    actions: {}
});