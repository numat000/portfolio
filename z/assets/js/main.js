/* B1. セクション止まり蝶 */
const sectionButterflyMap = [
  { butterfly: '.sb-concept',  trigger: '.section-concept' },
  { butterfly: '.sb-service',  trigger: '.section-service' },
  { butterfly: '.sb-works',    trigger: '.section-works' },
  { butterfly: '.sb-voice',    trigger: '.section-voice' },
  { butterfly: '.sb-flow',     trigger: '.section-flow' },
  { butterfly: '.sb-faq',      trigger: '.section-faq' },
];

sectionButterflyMap.forEach(({ butterfly, trigger }) => {
  const el = document.querySelector(butterfly);
  if (!el) return;

  /* フェードイン：セクションが画面に入ったら表示 */
  gsap.to(el, {
    opacity: 0.7, duration: 1.2, ease: 'power2.out',
    scrollTrigger: { trigger: trigger, start: 'top 70%', end: 'top 30%', scrub: 1 },
  });

  /* フェードアウト：セクションが画面から出るとき非表示 */
  gsap.to(el, {
    opacity: 0, duration: 1.2, ease: 'power2.in',
    scrollTrigger: { trigger: trigger, start: 'bottom 70%', end: 'bottom 30%', scrub: 1 },
  });

  /* ゆらゆら浮遊 */
  gsap.to(el, {
    y: '+=12', x: '+=5', rotation: 3,
    duration: 3 + Math.random() * 2,
    ease: 'sine.inOut', yoyo: true, repeat: -1,
  });
});

/* B2. スクロール連動の飛ぶ蝶（変更なし — セクション内absoluteでも動作） */
/* MotionPath は element の position に対して相対的に動くので、
   Service セクション内に配置しても問題ありません */

/* B3. モーフィング演出 — wrapper のopacity制御に変更 */
const morphWrapper = document.querySelector('.morph-stage-wrapper');
const morphPath = document.querySelector('#morph-path');
const morphTarget = document.querySelector('#morph-target-butterfly');
const morphBlackout = document.querySelector('.morph-blackout');

if (morphWrapper && morphPath && morphTarget && morphBlackout) {
  const morphTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-faq', start: 'bottom 90%',
      endTrigger: '.section-contact', end: 'top 10%',
      scrub: 2,
    },
  });

  morphTL
    .to(morphWrapper, { opacity: 1, duration: 0.15, ease: 'power2.out' })
    .to(morphPath, {
      morphSVG: { shape: morphTarget, type: 'rotational', origin: '50% 50%' },
      fill: 'rgba(100,50,160,0.7)', stroke: 'rgba(100,50,160,0.7)',
      duration: 0.4, ease: 'power2.inOut',
    })
    .to('.morph-svg', { y: -50, scale: 1.2, duration: 0.15, ease: 'power2.out' })
    .to(morphBlackout, { opacity: 1, duration: 0.3, ease: 'power2.in' })
    .to(morphWrapper, { opacity: 0, duration: 0.05 });
}
