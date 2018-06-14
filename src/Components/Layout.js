import React from "react"
import Calendar from "./Calendar"
import AddOutlayForm from "./AddOutlayForm"
import { Info, DateTime } from "luxon"
import { base } from "../firebase"

class Layout extends React.Component {
  state = { total_costs: 0, sorted_list: {} }

  componentDidMount() {
    this.cost_listRef = base.syncState("sorted_list", {
      context: this,
      state: "sorted_list"
    })
    this.cost_listRef1 = base.syncState("total_costs", {
      context: this,
      state: "total_costs"
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.cost_listRef)
    base.removeBinding(this.cost_listRef1)
  }

  addCosts = item => {
    let temp_list
    if (this.state.sorted_list !== null && this.state.sorted_list != undefined && this.state.sorted_list !== "Null") {
      temp_list = this.state.sorted_list
    } else {
      temp_list = {}
    }

    item.date = DateTime.fromSQL(item.date)

    if (!temp_list[item.date.year]) {
      temp_list[item.date.year] = {}
    }
    if (!temp_list[item.date.year][item.date.month]) {
      temp_list[item.date.year][item.date.month] = {}
    }
    if (!temp_list[item.date.year][item.date.month][item.date.day]) {
      temp_list[item.date.year][item.date.month][item.date.day] = []
    }

    temp_list[item.date.year][item.date.month][item.date.day].push(item)

    this.setState({
      total_costs: +this.state.total_costs + eval(item.cost),
      sorted_list: temp_list
    })
  }

  deleteCosts = (year, month, day, id, cost) => {
    console.log("delete cost", cost)
    let temp_list = this.state.sorted_list
    temp_list[year][month][day] = temp_list[year][month][day].filter(i => i.id !== id)
    this.setState({
      total_costs: this.state.total_costs - cost,
      sorted_list: temp_list
    })
  }

  render() {
    const { total_costs, sorted_list } = this.state
    return (
      <div>
        <AddOutlayForm addCosts={this.addCosts} />
        <Calendar cost_list={sorted_list} deleteCosts={this.deleteCosts} total_costs={total_costs} />
      </div>
    )
  }
}

export default Layout
