import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfumeItem from '../utils/PerfumeItem';
import Spinner from '../utils/Spinner';
import { getFemalePerfume } from '../../actions/perfume';

const FemalePerfume = ({ perfume, getFemalePerfume }) => {
  const { isLoading, items } = perfume;

  useEffect(() => {
    window.scrollTo(0, 0);
    getFemalePerfume();
  }, [getFemalePerfume]);
  return (
    <section className="py-4">
      <div className="container">
        <div className="d-flex justify-content-between py-3 mb-3 border-bottom border-grey">
          <p>所有女士商品</p>
          <p>{isLoading ? '' : items.length + ' 结果'}</p>
        </div>
        <div className="items-wrap">
          {isLoading ? (
            <Spinner />
          ) : items.length ? (
            items.map(item => (
              <PerfumeItem
                imgSrc={item.handle}
                key={item._id}
                id={item._id}
                title={item.name}
              />
            ))
          ) : (
            'no imtes'
          )}
        </div>
      </div>
    </section>
  );
};

FemalePerfume.propTypes = {
  perfume: PropTypes.object.isRequired,
  getFemalePerfume: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  perfume: state.perfume
});

export default connect(
  mapStateToProps,
  { getFemalePerfume }
)(FemalePerfume);
