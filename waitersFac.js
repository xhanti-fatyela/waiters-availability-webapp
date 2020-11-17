module.exports = function waitersApp(pool){

    async function waiterInfo(name) {
        const selectQuery = await pool.query('select id from waiters_info where (waiter_name)=($1)', [name])
        if (selectQuery.rowCount === 0) {
            await pool.query('insert into waiters_info (waiter_name) values ($1)', [name])

        }
    }

    async function allWaiters() {
        let all = await pool.query('select waiter_name from waiters_info');
        return all.rows
    }


    async function daysEntered(name, day) {
        const selectQuery = await pool.query('select id from waiters_info where (waiters_info)=($1)', [name])
        const nameId = selectQuery.rows[0].id
        await pool.query('delete from all_info where names_id = $1', [nameId])
        for (let i = 0; i < day.length; i++) {
            const selectedDays = await pool.query('select id from weekdays where days_booked =($1)', [day[i]])
            const dayId = selectedDays.rows[0].id
            await pool.query('insert into all_info (names_id, days_id) values ($1, $2)', [nameId, dayId])

        }
    }

    async function showAllOnTable() {
        let allInfo = await pool.query('select * from all_info')
        return allInfo.rows
    }

    async function displayDays() {
        const days = await pool.query('select * from weekdays');
        return days.rows

    }
    async function dispalyNames() {
       
        const getDays = 'select * from weekdays';
        const eachDay = await pool.query(getDays)
        const shifts = eachDay.rows
       
        for (let shift of shifts) {
            const table = 'select names, all_info.id  from waiters_info join all_info on waiters_info.id = all_info.names_id where days_id = $1'
            let name = await pool.query(table, [shift.id])
            let waiterNames = name.rows
            shift.waiters = waiterNames

            if (shift.waiters && shift.waiters.length > 0) {
                if (shift.waiters.length > 3) {
                    shift.color = 'red'
                } else if (shift.waiters.length === 3) {

                    shift.color = 'green'
                } else {
                    shift.color = 'gold'
                }
            }
        }
        return shifts

    }
    async function getId(param) {
        let nameId = await pool.query('select id from waiters_info where (waiter_name)=($1)', [param])
        return nameId.rows[0].id
    }
    async function selectedShifts(id) {
        let getId = await pool.query('select * from weekdays join all_info on weekdays.id = all_info.days_id where names_id =($1)', [id])
        return getId.rows
    }

    async function reset() {
        await pool.query('delete from all_info')
    }

return{

    waiterInfo,
    allWaiters,
    daysEntered,
    showAllOnTable,
    displayDays,
    dispalyNames,
    getId,
    selectedShifts,
    reset



}

}