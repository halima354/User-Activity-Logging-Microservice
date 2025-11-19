export const create= async ({model,data={}}={})=>{
    const document = await model.create(data)
    return document
}

export const find= async ({model, filter={}, select= "", populate= [], skip=0, limit =1000, sort = { createdAt: -1 }}={})=>{
    const document = await model.find(filter).select(select).populate(populate).skip(skip).sort(sort).limit(limit)
    return document
}

export const findOne= async ({model, filter={}, select= "", populate= []}={})=>{
    const document = await model.findOne(filter).select(select).populate(populate)
    return document
}