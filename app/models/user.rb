class User < ApplicationRecord
    has_secure_password 

    has_many :items
    has_many :tabs, through: :items

    validates :full_name, presence: true, uniqueness: true
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true
    validates :password, presence: true, confirmation: true, length: { in: 13..40 }

end
