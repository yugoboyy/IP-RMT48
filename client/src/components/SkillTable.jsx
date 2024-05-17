export default function SkillTable({ skillName }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            {skillName.name} ({skillName.unlock})
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        skillName.upgrades?.map((detail, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {detail.name}
                                    </td>
                                    <td>
                                        {detail.value}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}