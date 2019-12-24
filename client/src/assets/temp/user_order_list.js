var data = [
    {
        "store": "洋津義大利麵",
        "by": "DH",
        "total": 123
    },
    {
        "store": "洋津義大利麵",
        "by": "DH",
        "total": 123
    },
    {
        "store": "洋津義大利麵",
        "by": "DH",
        "total": 123
    },
    {
        "store": "洋津義大利麵",
        "by": "DH",
        "total": 123
    }
]

const add = element => {
    data.push( element )
}

const read = () => {
    return data
}

export default { add, read }