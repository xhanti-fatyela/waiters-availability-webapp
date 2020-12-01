module.exports = function WaiterRoutes(waiters) {

    async function homepage(req, res, next) {
        let allDays = await waiters.displayDays();

        res.render("landingpage", {
            allDays
        })

    }

    async function waitersInfo(req, res, next) {

        let allDays = await waiters.displayDays();
        res.render("welcomepage", {
            allDays
        })

    }
    async function adding(req, res, next) {
            let user = req.params.username
            let days = req.body.day
            let allDays = await waiters.displayDays();
            await waiters.addAllInfo(user, days)
            if (days === undefined) {
                req.flash('error', 'Please select days')
                res.render("index", {
                    allDays
                });
                return
            }
             else if (user && days !== "") {
                req.flash('msg', 'days successfully submitted')
            }
            await waiters.waiterInfo(user);

            await waiters.allWaiters()
            res.render("index", {
                name: [{
                    'user': user
                }],
                allDays
            })
      

    }
    async function getInfo(req, res, next) {

        let user = req.params.username
        let days = req.body.day

        await waiters.waiterInfo(user);
        await waiters.allWaiters()
        await waiters.dispalyNames()
        let allDays = await waiters.displayDays();
        let theNameId = await waiters.getId(user)
        let schedule = await waiters.selectedShifts()

        allDays.forEach(day => {
            schedule.forEach(shift => {
                if (shift.days_id === day.id) {
                    day.state = "checked"
                }
            });
        });
        res.render("index", {
            name: [{
                'user': user
            }],
            allDays
        });


    }
    async function admin(req, res, next) {

        let names = await waiters.dispalyNames();
        let dayshift = await waiters.selectedShifts()
        let allDays = await waiters.displayDays();
console.log(names);
        res.render("days", {
            shifts: names, 
            dayshift,
            allDays
        })

    }
    async function reset(req, res, next) {
        await waiters.reset()
        req.flash('reset', 'Week succesfully reset')

        res.redirect("/days")

    }

    return {
        homepage,
        waitersInfo,
        adding,
        getInfo,
        admin,
        reset
    }
}