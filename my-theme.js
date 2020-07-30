'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('今日のテーマ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #今日のテーマ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
    '{userName} の{period}のテーマは、『マネする』です。',
    '{userName} の{period}のテーマは、『遊ぶ』です。おもいっきり遊んでみるのはいかがでしょう？',
    '{userName} の{period}のテーマは、『何もしない』です。',
    '{userName} の{period}のテーマは、『200%の力で仕事をする』です。',
    '{userName} の{period}のテーマは、『手を抜く』です。',
    '{userName} の{period}のテーマは、『なるべくオフライン』です。デジタルデトックスはいかがでしょう？',
    '{userName} の{period}のテーマは、『よく寝る』です。',
    '{userName} の{period}のテーマは、『昨日話していない人に話しかける』です。',
    '{userName} の{period}のテーマは、『オシャレ』です。',
    '{userName} の{period}のテーマは、『自炊』です。',
    '{userName} の{period}のテーマは、『外食 or テイクアウト』です。',
    '{userName} の{period}のテーマは、『散歩』です。',
    '{userName} の{period}のテーマは、『運動』です。',
    '{userName} の{period}のテーマは、『引きこもり』です。',
    '{userName} の{period}のテーマは、『外出』です。',
    '{userName} の{period}のテーマは、『何か作る』です。',
    '{userName} の{period}のテーマは、『本を読む』です。',
    '{userName} の{period}のテーマは、『変化する』です。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfcharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }

    // 今日の日付を足し合わせる
    let todayNum = 0;
    let now = new Date();
    todayNum = now.getFullYear() + now.getMonth() + now.getDate() ;
    //console.log(todayNum);

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = (sumOfcharCode + todayNum) % answers.length;
    let result = answers[index];
  
    result = result.replace(/{period}/g, now.getMonth()+1 + '月' + now.getDate() + '日');
    result = result.replace(/{userName}/g, userName);
    return result;
  }
  
// テストコード
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
