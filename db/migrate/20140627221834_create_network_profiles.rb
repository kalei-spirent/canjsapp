class CreateNetworkProfiles < ActiveRecord::Migration
  def change
    create_table :network_profiles do |t|
    	t.string :name
      	t.timestamps
    end
  end
end
