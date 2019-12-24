var data = [
    {
        "name": "劉承達1",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達2",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達3",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達4",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達5",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達6",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達7",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達8",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達9",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    },
    {
        "name": "劉承達0",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "88888"
    }
]

const add = element => {
    data.push( element )
}

const remove = index => {
    data.splice( index, 1 )
}

const read = () => {
    return data
}

export default { add, remove, read }