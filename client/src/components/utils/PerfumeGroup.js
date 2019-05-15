import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfumeItem from '../PerfumeItem';
import Spinner from './Spinner';
import { getAllPerfume } from '../../actions/perfume';

const AllPerfume = ({ perfume, getAllPerfume }) => {
  const { isLoading, items } = perfume;

  useEffect(() => {
    getAllPerfume();
  }, [getAllPerfume]);
  return (
    <section className="py-4">
      <div className="container">
        <div className="d-flex justify-content-between py-3 mb-3 border-bottom border-grey">
          <p>所有商品</p>
          <p>{isLoading ? '' : items.length + ' 结果'}</p>
        </div>
        <div className="items-wrap">
          {isLoading ? (
            <Spinner />
          ) : items.length ? (
            items.map(item => (
              <PerfumeItem imgSrc={item.handle} title={item.name} />
            ))
          ) : (
            'no imtes'
          )}
        </div>
      </div>
    </section>
  );
};

AllPerfume.propTypes = {
  perfume: PropTypes.object.isRequired,
  getAllPerfume: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  perfume: state.perfume
});

export default connect(
  mapStateToProps,
  { getAllPerfume }
)(AllPerfume);
