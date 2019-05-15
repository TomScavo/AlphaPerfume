import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfumeItem from '../utils/PerfumeItem';
import Spinner from '../utils/Spinner';

const MalePerfume = ({ perfume }) => {
  const { isLoading } = perfume;
  console.log(perfume);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="py-4">
      <div className="container">
        <div className="d-flex justify-content-between py-3 mb-3 border-bottom border-grey">
          <p>搜索结果</p>
          <p>{isLoading ? '' : perfume.items.length + ' 结果'}</p>
        </div>
        <div className="items-wrap">
          {isLoading ? (
            <Spinner />
          ) : perfume.items.length ? (
            perfume.items.map(item => (
              <PerfumeItem
                imgSrc={item.handle}
                key={item._id}
                id={item._id}
                title={item.name}
              />
            ))
          ) : (
            '未能找到该项目，换个关键词试试吧'
          )}
        </div>
      </div>
    </section>
  );
};

MalePerfume.propTypes = {
  perfume: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  perfume: state.perfume
});

export default connect(mapStateToProps)(MalePerfume);
