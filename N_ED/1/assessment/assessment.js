(function(){
  'use strict';
  const userNameInput    = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivided    = document.getElementById('result-area');
  const tweetDivided     = document.getElementById('tweet-area');

  assessmentButton.onclick = () => {

    const userName = userNameInput.value;
    if (userName.length === 0) { // 名前が空の時は処理を終了する
        return;
    }

    removeAllChild(resultDivided);
    const header = document.createElement('h1');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    removeAllChild(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('俺は競走馬で言うと')
    + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-lang', 'ja');
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = '競走馬で言うと、、ツイートする';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();
  };

  const answers = [
      '{userName}はキタサンブラックみたいです。',
      '{userName}はレイデオロみたいです。',
      '{userName}はクイーンズリングみたいです。',
      '{userName}はダノンプレミアムみたいです。',
      '{userName}はシュヴァルグランみたいです。',
      '{userName}はミッキーロケットみたいです。'
  ];

  function assessment(userName) {
    let sumOfcharCode = 0;

    for (let i = 0; i < userName.length; i++) {
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }
    const index  = sumOfcharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName)
    return result;
  }

  function removeAllChild (element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
            element.removeChild(element.firstChild);
    }
  }

  console.assert(
  assessment('太郎') === '太郎はシュヴァルグランみたいです。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
})();
