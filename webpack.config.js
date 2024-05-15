const path = require('path'); // node.js path 모듈을 불러옵니다. 운영체제별로 상이한 경로 문법(구분자 : / 혹은 \)를 해결해 절대 경로로 반환하는 역할을 합니다.
const webpack = require('webpack'); // 웹팩 모듈을 불러옵니다.
const childProcess = require('child_process'); // child_process 프로세스 모듈 : 터미널 명령어를 입력할 수 있게 합니다.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// module.exports : node의 모듈 문법입니다.
module.exports = {

    entry: {
        // main: './src/app.js'
        main: path.resolve('./src/app.js')
    },
    output: {
        filename: '[name].js', // entry의 key 값이 자동으로 [name]에 할당됩니다.
        path: path.resolve('./dist'),
    },
    module: {
        rules: [ // 여기서 로더를 추가할 수 있습니다.
            // {
            //     test: /\.js$/, // 로더가 처리해야할 파일의 패턴(정규표현식)입니다. 여기서 \는 .을 정규표현식 문법이 아닌 특수문자로, .js$ 는 .js 로 끝나는 모든 문자를 의미합니다.
            //     use: [
            //         // 위와 일치하는 패턴의 파일이 전달될 로더를 설정합니다.
            //         path.resolve('./myLoader.js')
            //     ]
            // },
            {
                test: /\.css$/,
                use: [ // 로더는 이렇게 추가할 수 있으며 실행되는 순서는 뒤에 있는 로더부터 앞으로 실행됩니다.
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024 // 20kb
                    }
                },

            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            // banner: '배너입니다!!~~'
            banner:
                `
            last build : ${new Date().toLocaleString()}
            git commit : ${childProcess.execSync('git rev-parse --short HEAD')} 
            committer : ${childProcess.execSync('git config user.name')}
            `
            // toLocaleString() : 사용자의 환경에 알맞는 형태로 스트링을 반환합니다. 인자로 장소를 지정하지 않으면 브라우저를 참고해 사용자의 장소를 설정합니다.

            // rev-parse : 커밋된 버전의 명세를 해쉬 함수로 표현합니다. --short : 짧게, HEAD : 커밋 아이디

        }),
        new webpack.DefinePlugin({ // 빌드시에 사용할 수 있는 전역 상수를 만들수 있습니다. 노드의 환경정보를 어플리케이션에 전달해줄 때 많이 사용합니다. 
            pw: 123456,
            env: JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // 목표 html파일의 위치입니다.
            // templateParameters: {
            //     env: process.env.NODE_ENV === 'development' ? '개발환경입니다' : ''
            // },
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true,
                removeComments: true,
            } : false
        })
    ],
    optimization: {
        // minimize: true는 웹팩의 최적화 설정 중 하나입니다. 이 옵션은 번들된 JavaScript 파일의 크기를 최소화하기 위해 해당 파일을 압축하는 작업을 수행할지 여부를 지정합니다.
        minimize: true,
        minimizer: [

            new ImageMinimizerPlugin({

                // e? : e가 있어도 되고 없어도 된다는 의미입니다. 
                test: /\.(jpe?g|png|gif|svg)$/i,
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["imagemin-optipng", { optimizationLevel: 3 }],
                        ],
                    },
                },
            }),
        ],
    },

};