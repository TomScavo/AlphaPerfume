import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  state = {
    index: 1,
    interID: 0,
    leftHidden: false,
    isFinish: true,
    innerHeight: 0,
    imgHeight: 0
  };

  // const marge = changePart => {
  //   this.setState(prevState => ({ ...prevState, ...changePart }));
  // };
  sliderAddCount = () => {
    let { index } = this.state;
    if (index < 3) {
      index++;
    } else {
      index = 1;
    }
    this.setState({ index });
  };

  sliderClass = position => {
    let { index, leftHidden } = this.state;
    if (position === 1) {
      if (index === 1) return 'center';
      if (index === 2) {
        if (leftHidden) {
          return 'left-perv';
        }
        return 'left';
      }
      if (index === 3) return 'right';
    }
    if (position === 2) {
      if (index === 1) return 'right';
      if (index === 2) return 'center';
      if (index === 3) {
        if (leftHidden) {
          return 'left-perv';
        }
        return 'left';
      }
    }
    if (position === 3) {
      if (index === 1) {
        if (leftHidden) {
          return 'left-perv';
        }
        return 'left';
      }
      if (index === 2) return 'right';
      if (index === 3) return 'center';
    }
  };
  checkFinish = isFinish => {
    let { interID } = this.state;
    if (!isFinish) return false;
    clearInterval(interID);
    isFinish = false;
    this.setState({ isFinish });
    setTimeout(isFinish => {
      isFinish = true;
      this.setState({ isFinish });
    }, 1100);
    return true;
  };
  onSliderClick = type => {
    let { index, isFinish, leftHidden } = this.state;
    if (!this.checkFinish(isFinish)) return false;

    if (type === 'prev') {
      leftHidden = true;
      this.setState(prevState => ({ ...prevState, leftHidden }));
      setTimeout(leftHidden => {
        leftHidden = false;
        this.setState(prevState => ({ ...prevState, leftHidden }));
        console.log('work');
      }, 1100);
      if (index === 1) {
        index = 3;
      } else {
        index--;
      }
    } else {
      if (index === 3) {
        index = 1;
      } else {
        index++;
      }
    }
    this.setState(prevState => ({ ...prevState, index }));
  };

  isCountActive = count => {
    let { index } = this.state;
    if (count === index) return 'slider-count-active';
    return '';
  };

  onCountClick = count => {
    let { isFinish, index, leftHidden } = this.state;
    if (!this.checkFinish(isFinish)) return false;
    if (
      (index === 1 && count === 3) ||
      (index === 3 && count === 2) ||
      (index === 2 && count === 1)
    ) {
      leftHidden = true;
      this.setState(prevState => ({ ...prevState, leftHidden }));
      setTimeout(leftHidden => {
        leftHidden = false;
        this.setState(prevState => ({ ...prevState, leftHidden }));
        console.log('work');
      }, 1100);
    }
    index = count;
    this.setState(prevState => ({ ...prevState, index }));
  };
  onImgLoad = () => {
    const imgHeight = Math.max(
      this.refs.imgHeight.clientHeight,
      this.refs.mobileImgHeight.clientHeight
    );
    const innerHeight = this.refs.inner.clientHeight;
    this.setState({ imgHeight, innerHeight });
  };

  getMonth = () => {
    const months = [
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十',
      '十一',
      '十二'
    ];
    return months[new Date().getMonth()];
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const moveSlider = setInterval(() => {
      this.sliderAddCount();
    }, 6000);
    let interID = moveSlider;
    this.setState({ interID });
  }

  componentWillUnmount() {
    clearInterval(this.state.interID);
  }

  render() {
    return (
      <Fragment>
        <main className="container py-3">
          <div
            style={{ height: this.state.innerHeight }}
            className="slider-inner"
          >
            <div
              ref="inner"
              className={`slider-item slider-${this.sliderClass(1)}`}
            >
              <img
                ref="imgHeight"
                onLoad={this.onImgLoad}
                src={require('../../img/slider1.jpg')}
                className=" slider-img w-100"
                alt="..."
              />
              <img
                ref="mobileImgHeight"
                onLoad={this.onImgLoad}
                src={require('../../img/mobile-slider1.jpg')}
                className=" slider-mobile-img w-100"
                alt="..."
              />
              <div className="slider-item-title  p-4">
                <h3 className="text-capitalize slider-item-mobile-title text-left">
                  Dior Sauvage
                </h3>
                <button className=" submit-button mt-3">
                  <i className="fas fa-shopping-bag text-white pr-2" />
                  <Link
                    to="/perfumeDetail/5cd9d82173c16204349588b9"
                    className="text-white"
                  >
                    <span>购 买</span>
                  </Link>
                </button>
              </div>
            </div>
            <div className={`slider-item slider-${this.sliderClass(2)}`}>
              <img
                src={require('../../img/slider2.jpg')}
                className=" slider-img w-100"
                alt="..."
              />
              <img
                src={require('../../img/mobile-slider2.jpg')}
                className=" slider-mobile-img w-100"
                alt="..."
              />
              <div className="slider-item-title  p-4">
                <h3 className="text-capitalize slider-item-mobile-title text-left">
                  Dior Poison Girl
                </h3>
                <button className=" submit-button mt-3">
                  <i className="fas fa-shopping-bag text-white pr-2" />
                  <Link
                    to="/perfumeDetail/5cdb3b7f76cc4511609e6e8b"
                    className="text-white"
                  >
                    <span>购 买</span>
                  </Link>
                </button>
              </div>
            </div>
            <div className={`slider-item slider-${this.sliderClass(3)}`}>
              <Link
                to="/perfumeDetail/5cdb4e7676cc4511609e6e9e"
                className="text-white"
              >
                <img
                  src={require('../../img/slider3.jpg')}
                  className=" slider-img w-100"
                  alt="..."
                />

                <img
                  src={require('../../img/mobile-slider3.jpg')}
                  className=" slider-mobile-img w-100"
                  alt="..."
                />
              </Link>
              <div className="slider-item-title  p-4">
                <h3 className="text-capitalize slider-item-mobile-title text-left">
                  Viktor&amp;Rolf Spice Bomb{' '}
                </h3>
                <button className=" submit-button mt-3">
                  <i className="fas fa-shopping-bag text-white pr-2" />
                  <Link
                    to="/perfumeDetail/5cdb4e7676cc4511609e6e9e"
                    className="text-white"
                  >
                    <span>购 买</span>
                  </Link>
                </button>
              </div>
            </div>
            <div
              style={{ height: this.state.imgHeight }}
              className="slider-control-wrap"
            >
              <div className="slider-control">
                <button
                  onClick={() => this.onSliderClick('prev')}
                  className="silder-control-pre"
                >
                  <i className="fas fa-chevron-left fa-2x" />
                </button>
                <button
                  onClick={() => this.onSliderClick('next')}
                  className="silder-control-next"
                >
                  {' '}
                  <i className="fas fa-chevron-right  fa-2x" />{' '}
                </button>
              </div>
              <div className="slider-count">
                <ul className="slider-count-list">
                  <li
                    onClick={() => {
                      this.onCountClick(1);
                    }}
                    className={`slider-count-item ${this.isCountActive(1)}`}
                  />
                  <li
                    onClick={() => {
                      this.onCountClick(2);
                    }}
                    className={`slider-count-item  ${this.isCountActive(2)}`}
                  />
                  <li
                    onClick={() => {
                      this.onCountClick(3);
                    }}
                    className={`slider-count-item  ${this.isCountActive(3)}`}
                  />
                </ul>
              </div>
            </div>
          </div>
        </main>
        <section className="py-3 px-5 section-recomand">
          <div className="d-flex justify-content-center">
            <div className="landing-date pt-3">
              <p className="border-bottom border-grey pb-3">
                {new Date().getDate()}
              </p>
              <p>{this.getMonth()}月</p>
            </div>
          </div>
          <h2 className="py-2">精选</h2>
          <div className="row">
            <div className="col-md-4 p-3">
              <img
                className="d-block mb-3"
                src={require('../../img/prada.jpg')}
                alt=""
              />
              <h3 className="mb-3 display-5">PRADA L'HOMME</h3>
              <p className="text-center">
                L’Homme
                PRADA绅士淡香水围绕鸢尾花和琥珀这两种品牌最具象征意味的成分而构建
              </p>
              <div className="d-flex justify-content-center">
                <button className=" submit-button mt-3">
                  <i className="fas fa-shopping-bag text-white pr-2" />
                  <Link
                    to="/perfumeDetail/5cdbf09f07f9332ac8fb8740"
                    className="text-white"
                  >
                    <span>购 买</span>
                  </Link>
                </button>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <img
                className="d-block mb-3"
                src={require('../../img/yellow.jpg')}
                alt=""
              />
              <h3 className="mb-3 text-uppercase">Versace Yellow Diamond</h3>
              <p className="text-left">
                2011年推出的新款香水，并以“黄钻”命名。新品以耀眼绚丽的黄色为其的包装设计，像一颗钻石闪闪发光，豪华而又不失精致。
              </p>
              <div className="d-flex justify-content-center">
                <button className=" submit-button mt-3">
                  <i className="fas fa-shopping-bag text-white pr-2" />
                  <Link
                    to="/perfumeDetail/5cdb554e76cc4511609e6ec9"
                    className="text-white"
                  >
                    <span>购 买</span>
                  </Link>
                </button>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <img
                className="d-block mb-3"
                src={require('../../img/choo.jpg')}
                alt=""
              />
              <h3 className="mb-3">JIMMY CHOO</h3>
              <p className="text-left">
                香氛Jimmy
                Choo表达出一种力与美的光环。璀璨迷人的气质、自信、聪颖、充满时尚感与乐趣，此香氛散发出极具现代感的果味花香，深具温暖、丰富、木本植物性的内涵。
              </p>
              <div className="d-flex justify-content-center">
                <button className=" submit-button mt-3">
                  <i className="fas fa-shopping-bag text-white pr-2" />
                  <Link
                    to="/perfumeDetail/5cdb54a376cc4511609e6ec5"
                    className="text-white"
                  >
                    <span>购 买</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-male py-4">
          <h2 className="pt-5 my-3">男士</h2>
          <p className="pb-5 my-3">
            从经典精品到最新作品，探索魅力男士香水世界。
          </p>

          <div className="container">
            <Link
              to="/perfumeDetail/5cd9dad107e96206a421a5e9"
              className="text-white"
            >
              <div className="row">
                <div className="col-md-4">
                  <img
                    className=" mb-3"
                    src={require('../../img/coolwater1.jpg')}
                    alt=""
                  />
                </div>
                <div className="col-md-4">
                  <img
                    className=" mb-3"
                    src={require('../../img/coolwater2.jpg')}
                    alt=""
                  />
                </div>
                <div className="col-md-4">
                  <img
                    className=" mb-3"
                    src={require('../../img/coolwater3.jpg')}
                    alt=""
                  />
                </div>
              </div>
            </Link>
            <div className="text-left">
              <div className="row">
                <div className="col-md-6">
                  <h4>DAVIDOFF COOL WATER</h4>
                  <p>
                    这款被称为“来自肌肤之下”的香水，以海洋为创意的蓝本，有着清新、蔚蓝、自然的风格。
                  </p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <Link
                    to="/perfumeDetail/5cdb4da476cc4511609e6e9b"
                    className="text-white"
                  >
                    <img
                      className=" mb-3"
                      src={require('../../img/gio.jpg')}
                      alt=""
                    />
                  </Link>
                  <p>ACQUA DI GIO PROFUMO</p>
                </div>
                <div className="col-md-3">
                  <Link
                    to="/perfumeDetail/5cdb465e76cc4511609e6e94"
                    className="text-white"
                  >
                    <img
                      className=" mb-3"
                      src={require('../../img/male2.jpg')}
                      alt=""
                    />
                  </Link>
                  <p>JEAN PAUL GAULTIER</p>
                </div>
                <div className="col-md-3">
                  <Link
                    to="/perfumeDetail/5cdb4d4176cc4511609e6e99"
                    className="text-white"
                  >
                    <img
                      className=" mb-3"
                      src={require('../../img/invictus.jpg')}
                      alt=""
                    />
                  </Link>
                  <p className="text-uppercase">paco rabanne INVICTUS</p>
                </div>
                <div className="col-md-3">
                  <Link to="/perfumeDetail/5cdb4eb976cc4511609e6e9f">
                    <img
                      className=" mb-3"
                      src={require('../../img/jhon.jpg')}
                      alt=""
                    />
                  </Link>
                  <p>JOHN VARVATOS ARTISAN</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-female py-5">
          <h2 className="pt-5 my-3">女士</h2>
          <p className="pb-5 my-3">
            从标志性杰作到最新作品，探索女士香水的妩媚魅力。
          </p>

          <div className="container">
            <Link
              to="/perfumeDetail/5cdb53db76cc4511609e6ec1"
              className="text-white"
            >
              <div className="row">
                <div className="col-md-4">
                  <img
                    className=" mb-3"
                    src={require('../../img/pink1.jpg')}
                    alt=""
                  />
                </div>
                <div className="col-md-4">
                  <img
                    className=" mb-3"
                    src={require('../../img/pink2.jpg')}
                    alt=""
                  />
                </div>
                <div className="col-md-4">
                  <img
                    className=" mb-3"
                    src={require('../../img/pink3.jpg')}
                    alt=""
                  />
                </div>
              </div>
            </Link>
            <div className="text-left">
              <div className="row">
                <div className="col-md-6">
                  <h4>VERSACE BRIGHT CRYSTAL</h4>
                  <p>
                    温和的粉嫩色调、银质时尚触感以及典雅细致的包装，承袭著VERSACE一贯的时尚风格，完美呈现香恋水晶优雅、脱俗与爱情柔美的魅力。
                  </p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <Link to="/perfumeDetail/5cdb54a376cc4511609e6ec5">
                    <img
                      className=" mb-3"
                      src={require('../../img/choo.jpg')}
                      alt=""
                    />
                  </Link>
                  <p>JIMMY CHOO</p>
                </div>
                <div className="col-md-3">
                  <Link to="/perfumeDetail/5cdb547976cc4511609e6ec4">
                    <img
                      className=" mb-3"
                      src={require('../../img/juicy.jpg')}
                      alt=""
                    />
                  </Link>
                  <p>VIVA LA JUICY</p>
                </div>
                <div className="col-md-3">
                  <Link to="/perfumeDetail/5cdb55a276cc4511609e6ecb">
                    <img
                      className=" mb-3"
                      src={require('../../img/sugar.jpg')}
                      alt=""
                    />
                  </Link>
                  <p>AQUOLINA PINK SUGAR</p>
                </div>
                <div className="col-md-3">
                  <Link to="/perfumeDetail/5cdb54da76cc4511609e6ec6">
                    <img
                      className=" mb-3"
                      src={require('../../img/white.jpg')}
                      alt=""
                    />
                  </Link>
                  <p>ELIZABETH TAYLOR WHITE DIAMONDS</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Landing;
