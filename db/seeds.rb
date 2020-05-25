1.times do |i|
    Qualification.create(
      name: "Qualification #{i + 1}",
      skill: 'Jellyfish Health',
      experience: 'Software Developer in Test'
    )
end