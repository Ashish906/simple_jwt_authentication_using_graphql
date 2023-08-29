import { UserModal } from '../modals.js'

export const getAnUser = async (query) => await UserModal.findOne(query)