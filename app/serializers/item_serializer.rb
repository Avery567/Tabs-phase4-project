class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :completed, :tab
end
