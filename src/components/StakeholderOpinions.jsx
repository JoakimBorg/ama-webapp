function StakeholderOpinions({ opinions }) {
  return (
    <div className="stakeholder-opinions">
      <h3 id="stakeholder-opinions-title">Example stakeholder opinions</h3>
      <table aria-labelledby="stakeholder-opinions-title">
        <thead>
          <tr>
            <th scope="col">Stakeholder</th>
            <th scope="col">Opinion</th>
          </tr>
        </thead>
        <tbody>
          {opinions.map((opinion) => (
            <tr key={opinion.stakeholder}>
              <th scope="row">{opinion.stakeholder}</th>
              <td>
                <span className="sr-only">{opinion.supports ? 'Thumbs up' : 'Thumbs down'}</span>
                <span aria-hidden="true">{opinion.supports ? '👍' : '👎'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StakeholderOpinions
