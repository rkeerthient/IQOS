/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import { Tab, RadioGroup, Disclosure } from "@headlessui/react";
import RTF from "../components/RTF";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { AiTwotoneCheckCircle } from "react-icons/ai";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "primaryPhoto",
      "price",
      "c_shortDescription",
      "c_richTextDescription",
      "c_delivery",
      "c_returns",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["product"],
      entityIds: ["159036562"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : document.id.toString();
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Product: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    primaryPhoto,
    price,
    c_shortDescription,
    c_richTextDescription,
    c_delivery,
    c_returns,
    uid,
  } = document;

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <PageLayout>
        <div className="bg-hard-white py-4 py-lg-5 px-lg-4 d-flex justify-content-center text-[#34303d] bg-[#f6f4f0]">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <Tab.Group as="div" className="flex flex-col-reverse">
                {/* Image selector */}

                <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                  <Tab.Panel key={uid}>
                    <img
                      src={primaryPhoto.image.url}
                      alt="heats"
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-0 p-0 mt-4 mt-lg-0 leading-6">
                <div className="mw-100  mx-8 mb-3 p-6 px-5  ">
                  <h3 className="text-5xl font-medium">
                    HEETS AMBER BUNDLE (10)
                  </h3>
                  <div className="my-7 py-2">
                    <span className="text-sm ">
                      Rounded, toasted tobacco blend with light woody and nutty
                      aroma notes
                    </span>
                  </div>
                  <div className="mb-7 py-2">
                    <div className="d-flex align-items-end mb-1 mb-lg-0">
                      <div className="pe-2 me-1">
                        <span className="text-2xl" data-pmi-el="price">
                          £60.00
                        </span>
                      </div>
                      <div className="pe-3"></div>
                      <div>
                        <span
                          className=" fs-7 lh-1 pp-dv__value"
                          data-pmi-el="discount-value"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-10 my-7 py-2">
                      <div
                        className="product-main pdp-btn-row-wrap"
                        aria-live="polite"
                      >
                        <div className="stock-level--container hidden">
                          <span className="stock-level--in-stock">
                            In stock
                          </span>
                        </div>

                        <div className="flex row items-center">
                          <div className="col-4 col-lg-3 pe-0 product-main__actionsWrapper-newPdp">
                            <div
                              className="me-2 pe-1 flex-fill"
                              data-target="quantity-selector"
                            >
                              <select
                                className="form-select bg-hard-white border-gray-300"
                                id="quantity"
                                name="product-quantity"
                                aria-controls="quantity-button"
                                data-product-max-qty="100"
                                aria-label="QTY HEETS AMBER BUNDLE (10)"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="49">49</option>
                                <option value="50">50</option>
                                <option value="51">51</option>
                                <option value="52">52</option>
                                <option value="53">53</option>
                                <option value="54">54</option>
                                <option value="55">55</option>
                                <option value="56">56</option>
                                <option value="57">57</option>
                                <option value="58">58</option>
                                <option value="59">59</option>
                                <option value="60">60</option>
                                <option value="61">61</option>
                                <option value="62">62</option>
                                <option value="63">63</option>
                                <option value="64">64</option>
                                <option value="65">65</option>
                                <option value="66">66</option>
                                <option value="67">67</option>
                                <option value="68">68</option>
                                <option value="69">69</option>
                                <option value="70">70</option>
                                <option value="71">71</option>
                                <option value="72">72</option>
                                <option value="73">73</option>
                                <option value="74">74</option>
                                <option value="75">75</option>
                                <option value="76">76</option>
                                <option value="77">77</option>
                                <option value="78">78</option>
                                <option value="79">79</option>
                                <option value="80">80</option>
                                <option value="81">81</option>
                                <option value="82">82</option>
                                <option value="83">83</option>
                                <option value="84">84</option>
                                <option value="85">85</option>
                                <option value="86">86</option>
                                <option value="87">87</option>
                                <option value="88">88</option>
                                <option value="89">89</option>
                                <option value="90">90</option>
                                <option value="91">91</option>
                                <option value="92">92</option>
                                <option value="93">93</option>
                                <option value="94">94</option>
                                <option value="95">95</option>
                                <option value="96">96</option>
                                <option value="97">97</option>
                                <option value="98">98</option>
                                <option value="99">99</option>
                                <option value="100">100</option>
                              </select>
                            </div>
                          </div>

                          <div
                            className="product-main__button-container product__button-wrapper col"
                            data-pmi-el="pdp-button-wrapper"
                          >
                            <div>
                              <button
                                id="addToCartG0000001"
                                className="bg-[#34303d] border-[#34303d] w-100 text-white px-10 py-3 rounded-full"
                                data-product-code="G0000001"
                              >
                                <span className="text-nowrap btn__label">
                                  Add to basket
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product__info-text-wrapper my-7 py-6">
                    <span>
                      Rounded, toasted tobacco blend with light woody and nutty
                      aroma notes. Each pack of HEETS Amber contains 20 HEETS.
                      This box contains 10 packs (200 HEETS). Individual packs
                      cost £6 and are not sold separately online.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-hard-white py-4 py-lg-5 px-lg-4 d-flex justify-content-center text-[#34303d] bg-white">
          <div className="mx-auto max-w-2xl px-4 py-8  lg:max-w-7xl lg:px-8 ">
            <div className="w-full px-4 pt-16">
              <div className="mx-auto w-full  rounded-2xl bg-white p-2">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-2xl font-light  focus-visible:ring-opacity-75">
                        <span>Delivery</span>
                        <ChevronDownIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 `}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2  ">
                        <RTF>{c_delivery}</RTF>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <hr className="my-4" />
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-2xl font-light  focus-visible:ring-opacity-75">
                        <span>Returns</span>
                        <ChevronDownIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 `}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2  ">
                        <RTF>{c_returns}</RTF>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-hard-white py-4 py-lg-5 px-lg-4 d-flex justify-content-center text-[#34303d]  ">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24   lg:px-8">
            <div className="mt-3 space-y-6">
              <h3 className="text-center text-[#34303d] font-bold">
                HEETS Taste Profile
              </h3>
              <p className="text-center">{c_shortDescription}</p>
              <div className="grid grid-cols-2 mx-auto text-center gap-y-5">
                <div className="text-left">Body</div>
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <AiTwotoneCheckCircle
                          key={rating}
                          className={classNames(
                            3 > rating ? "text-[#f47521]" : "text-gray-300",
                            "h-3 w-3 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-left">Aroma</div>
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <AiTwotoneCheckCircle
                          key={rating}
                          className={classNames(
                            4 > rating ? "text-[#f47521]" : "text-gray-300",
                            "h-3 w-3 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-left">Intensity</div>
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <AiTwotoneCheckCircle
                          key={rating}
                          className={classNames(
                            3 > rating ? "text-[#f47521]" : "text-gray-300",
                            "h-3 w-3 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-hard-white py-4 py-lg-5 px-lg-4 flex justify-center text-[#34303d] ">
          <div className="mx-auto max-w-7xl ">
            <img src="https://i.imgur.com/gygfSDM.png" alt="" />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Product;
