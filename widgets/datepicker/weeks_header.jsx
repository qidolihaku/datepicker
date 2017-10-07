import React  from "react";

export default class WeeksHeader extends React.Component
{
    static defaultProps = {
        weeksTitle: ['S','M','T','W','T','F','S'],
    }

    render() {
        return (
            <tr className="week-header">
            {
                this.props.weeksTitle.map((title, i) => {
                    return <td key={`week-header-${i}`} className="week-title">{title}</td>
                })
            }
            </tr>
        )
    }
}
