function ajax_save(id_st, love_or_nope) {
    console.log(JSON.stringify(Array.from(id_st)))
    $.ajax({
        type: "POST",
        url: "/save_persona/",
        dataType: 'json',
        xhrFields: { withCredentials: true },
        crossDomain: true,
        data: {
            "love_or_nope": love_or_nope,
            "idstr_li": JSON.stringify(Array.from(id_st)),
            "csrfmiddlewaretoken": CSRF_TOKEN
        },
        success: function (newData) {
            console.log(newData)
        }
    })
    // data = {
    //     "love_or_nope": love_or_nope,
    //     "idstr_li": JSON.stringify(Array.from(id_st)),

    // }

    // fetch("/save_persona/", {
    //     credentials: "include",
    //     method: "POST", headers: { "X-CSRF-Token": CSRF_TOKEN },
    //     body: data,
    // })

    // .then(...).catch(...);
}

function storeData(id_st, love_or_nope) {
    const request = indexedDB.open("tinder_data");

    request.onupgradeneeded = function (e) {
        let db = e.target.result;
        console.log(`running onupgradeneeded, version: ${db.version}`);
        db.createObjectStore('data');
    };
    request.onsuccess = function (e) {
        ajax_save(id_st, love_or_nope)

        let db = e.target.result;
        // get an object store to operate on it
        let transaction = db.transaction("data", "readwrite");
        let items = transaction.objectStore("data");

        const req = items.get(love_or_nope);
        req.onsuccess = function () {
            const st = req.result || new Set();
            id_st.forEach(it => st.add(it))
            id_st.clear()
            const suc = items.put(st, love_or_nope);
        };
        db.close();
    }
}

function loadCards() {
    $.ajax({
        type: "GET",
        url: "/home_update",
        data: {},
        success: function (newData) {
            // remove .demo-empty-slide
            // swiper.removeSlide(tot - 1);
            let li = newData.split('<!-- SPLIT TAG -->')
            swiper.appendSlide(li)
            console.log(`successfully added ${li.length} slides`)
        }
    })
}

async function delete_data(del_url) {
    $.ajax({
        type: "POST",
        url: del_url,
        dataType: 'json',
        data: {
            "csrfmiddlewaretoken": CSRF_TOKEN
        },
        success: function (newData) {
            console.log(newData)
        }
    })

    let request = indexedDB.deleteDatabase("tinder_data");
    request.onsuccess = function () {
        console.log("deleted tinder_data successfully")
    }
    // getData("love");
}