class TabSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed
  has_many :items
end
