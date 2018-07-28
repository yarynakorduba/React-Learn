import React from "react"
import { deleteOutlay } from "../actions"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Outlay = ({ amount, title, id, dispatch }) => (
  <div className="outlay-details__container">
    {amount}
    $&nbsp;{title}
    <button className="outlay__details--button" onClick={() => dispatch(deleteOutlay(id))}>
      x
    </button>
  </div>
)

Outlay.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(Outlay)
