class CreateQualifications < ActiveRecord::Migration[6.0]
  def change
    create_table :qualifications do |t|
      t.string :name, null: false
      t.text :experience, null: false
      t.text :skill, null: false
      t.string :image, default: '/images/robertCrites.png'
      t.timestamps
    end
  end
end
