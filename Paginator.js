import React from "react";
import classNames from "classnames";
import PaginatorButtoner from "./../components/PaginatorButtoner";

class Paginator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataCRUD: [],
      pageNum: 1,
      maxPage: 0,
      maxItemsPerPage: 10,
      totalItems: 0
    };
    this.onArrow = this.onArrow.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
    this.onSelectChoice = this.onSelectChoice.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const dataCRUD = nextProps.dataCRUD;
    if (dataCRUD && dataCRUD.length > 0) {
      this.setState({ totalItems: nextProps.dataCRUD.length });
    }
    const maxPage = nextProps.dataCRUD
      ? Math.ceil(nextProps.dataCRUD.length / this.state.maxItemsPerPage)
      : null;
    this.setState(prevState => {
      return { ...prevState, dataCRUD: dataCRUD, maxPage: maxPage };
    });
  }

  onTabClick(e) {
    let pageNum = Number(e.currentTarget.text);
    if (pageNum <= this.state.maxPage && pageNum >= 1 && pageNum !== "...") {
      this.setState(prevState => {
        return { ...prevState, pageNum: pageNum };
      });
    }
  }

  onArrow(e) {
    const name = e.currentTarget.name;
    let pageNum = this.state.pageNum;
    name === "nextArrow" ? pageNum++ : pageNum--;
    if (pageNum <= this.state.maxPage && pageNum >= 1) {
      this.setState(prevState => {
        return { ...prevState, pageNum: pageNum };
      });
    }
  }

  onSelectChoice(e) {
    const maxItemsPerPage = Number(e.currentTarget.value);
    this.setState(prevState => {
      return {
        ...prevState,
        maxItemsPerPage: maxItemsPerPage,
        maxPage: Math.ceil(this.state.totalItems / maxItemsPerPage)
      };
    });
  }

  render() {
    const pageDataArray = () => {
      const pageNum = this.state.pageNum;
      let dataArray = this.state.dataCRUD.slice(
        (pageNum - 1) * this.state.maxItemsPerPage,
        pageNum * this.state.maxItemsPerPage
      );
      return dataArray;
    };

    const lister =
      this.state.dataCRUD && this.state.dataCRUD.length !== 0
        ? this.props.renderList(pageDataArray())
        : null;

    return this.state.maxPage && this.state.maxPage !== 0 ? (
      <React.Fragment>
        <div>{lister}</div>
        <div className="text-center">
          <ul className="pagination">
            <li className={this.state.pageNum === 1 ? "disabled" : ""}>
              <a
                name="prevArrow"
                onClick={this.state.pageNum !== 1 ? this.onArrow : null}
              >
                <i className="fa fa-arrow-left" />
              </a>
            </li>
            <PaginatorButtoner
              pageNum={this.state.pageNum}
              maxPage={this.state.maxPage}
              onTabClick={this.onTabClick}
            />
            <li
              className={classNames({
                disabled: this.state.pageNum === this.state.maxPage
              })}
            >
              <a
                name="nextArrow"
                onClick={
                  this.state.pageNum !== this.state.maxPage
                    ? this.onArrow
                    : null
                }
              >
                <i className="fa fa-arrow-right" />
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <ul className="pagination">
            <li>
              <a>
                <select
                  name="choice"
                  value={this.state.maxItemsPerPage}
                  onChange={this.onSelectChoice}
                >
                  <option value="5">5</option>
                  <option value="10" selected="selected">
                    10
                  </option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
              </a>
              </li>
              </ul>
              </div>
      </React.Fragment>
    ) : null;
  }
}

export default Paginator;
