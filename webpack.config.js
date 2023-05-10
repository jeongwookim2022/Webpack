// webpack은 Browser환경이 아닌 nodeJS 환경에서 작동함.

// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  // 파일을 읽어들기 시작하는 진입점.
  // -> parcel index.html 처럼.
  entry: './js/main.js',

  // entry로부터 읽어들인 file의 연결관계를 분석하여
  // 결과물(bundle)을 반환하는 설정.
  output: {
    // (1)path와 (2)filename은 default로 'dist'라는 폴더와,
    // 위의 'entry'의 파일로 정해짐.

    // path: path.resolve(__dirname, 'public'),
    // public라는 폴더에 main.js라는 파일 이름으로, entry에서
    // 읽어들인 모든 내용들을 bundle로 만들어서 저장.
    // filename: 'main.js',
    // public이라는 폴더에 존재하는 '이전' file(bundle)들을 지움.
    clean: true
  },

  module: {
    rules: [
      {
        // '.css'로 끝나는 것들을 찾는 reqexp. ~$가 끝나는 ~로 끝나는 것을 의미.
        // reqexp중 '?'을 사용하여, scss나 css 파일이 둘 다 사용될 수 있도록 설정.
        test: /\.s?css$/,
        use: [ // 아래에서 위 순서로 읽히는 듯.
          'style-loader', // css-loader에서 해석된 css 내용을 html의 style태그에 삽임함.
          'css-loader', // JS에선 css가 해석 불가하므로, 해석을 위해 설치.
          'postcss-loader', // sass-loader를 통해 해석된 내용을, postcss-loader를 통해 공급업체 접두사 적용 및 postcss의 plugin 사용 가능하도록 함.
          'sass-loader', // webpack에서 해당 scss파일을 읽어냄.
          // 'sass' // sass-loader 읽을 때, 실제 scss 문법을 해석할 수 있게 함.
        ]
      },
      {
        // test: '.js'로 끝나는 모듈들을 전부 선택
        // use: 모듈의 사용할 패키지들의 이름을 적음.
        test: /\.js$/,
        use: [
          'babel-loader' // 설치한 babel 패키지들을 webpack이 해석할 수 있도록 함. 
                         // 즉, main.js등  '.js'로 끝나는 js파일들을 webpack에서
                         // babel-loader로 읽어 들여서 babel이 적용될 수 있도록 함.
        ]
      }
    ]
  },

  // entry의 파일을 읽어들어서, 결과물(bundle)을 내놓을 때, plugins의
  // 내용을 활용한다.
  plugins: [
    // 이때, template으로 index.html을 지정한 것. 그럼, bundle과 index.html이
    // 함께 렌더링 되어, dist폴더에 저장됨.
    new HtmlPlugin({
      template: './index.html'
    }),
    // 만들어 놓은 static의 내부 내용들이 dist에 복사되어 들어감.
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}