import React, { useEffect, useState } from "react";
import CheckBox from "../Inputs/CheckBox";
import RadioButton from "../Inputs/RadioButton";
import "./lotstyle.scss";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../Loader/Loader";
import Product from "../HomePage/Product";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import MetaData from "../MetaData/MetaData";

const Lot = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500000]);
  const [category, setCategory] = useState("");

  const { loading, error, products, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <h1> Lot Page</h1> */}
          <MetaData title="Active Auctions"></MetaData>

          <div className=" lotcls" data-aos="fade-up" data-aos-delay="400">
            <div className="row">
              <div className="col-10 mx-auto">
                {/* Heading Section */}

                <div className="section-title" data-aos="fade-up">
                  <h2>Auctions</h2>
                  <p>Start Bidding Now!</p>
                </div>

                <section className="lots-section">
                  <div className="lots-list-content lots-container">
                    <section className="filters">
                      <div className="filters-container displayFilters">
                        {/* <div className="filter-container">
                <div className="filter-title">Search among</div>
                <div className="filter-list">
                  <div>
                    <RadioButton value=""  name="search-among" label="All Auctions" />
                  </div>
                  <div>
                    <RadioButton value="active"  name="search-among" label="Active Auctions" />
                  </div>
                  <div>
                    <RadioButton value="sold"  name="search-among" label="Featured Auctions"/>
                  </div>
                  
                </div>
              </div> */}

                        <div className="filter-container">
                          <div className="filter-list"></div>
                          {/* {category} */}
                        </div>

                        {/* <div className="filter-container">
                <div className="filter-title">Payment type</div>
                <div className="filter-list">
                  
                    <div key="payment">
                      <CheckBox
                        id="payment1"
                        name="payment"
                        value="Cash"
                        label="Cash"
                       
                      />

                       <CheckBox
                        id="payment1"
                        name="payment"
                        value="Cash"
                        label="Debit Card"
                       
                      />

                       <CheckBox
                        id="payment1"
                        name="payment"
                        value="Cash"
                        label="Other"
                       
                      />

                       
                    </div>
                 
                </div>
              </div> */}

                        {/* 
              <div className="filter-container">
                <div className="filter-title">Delivery type</div>
                <div className="filter-list">
                
                    {/* <div key="delivery">
                      <CheckBox
                        type="checkbox"
                        id="delivery1"
                        name="Courior"
                        value="Courior"
                        label="Courior"
                      
                      {/* />
                    </div> */}
                      </div>
                    </section>
                    <section className="product-lots">
                      <div className="row">
                        <div className="col-12">
                          <div className="product-topbar d-flex align-items-center justify-content-between">
                            {/* <!-- Total Products --> */}
                            <div className="total-products">
                              {keyword ? (
                                <p>
                                  Results of <span>{keyword}</span>
                                </p>
                              ) : (
                                <p></p>
                              )}
                            </div>
                            {/* <!-- Sorting --> */}
                            <div className="product-searching ">
                              <div className="container">
                                <div className="row height d-flex justify-content-center align-items-center">
                                  <div className="col-md-8 ctrlwidth"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="lots-grid">
                        {products &&
                          products.map((product) => (
                            <Product product={product} />
                          ))}
                      </div>

                      {/* <h1>Pagination</h1> */}

                      {resultPerPage < productCount && (
                        <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={resultPerPage}
                          totalItemsCount={productCount}
                          onChange={setCurrentPageNo}
                          nextPageText="Next"
                          prevPageText="Prev"
                          firstPageText="1st"
                          lastPageText="Last"
                          itemClass="page-item"
                          linkClass="page-link"
                          activeClass="pageItemActive"
                          activeLinkClass="pageLinkActive"
                        />
                      )}
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lot;
