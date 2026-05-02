/**
 * The PersonModel class defines a person with a name and age.
 * It is exported so it can be used by the main server file.
 */
class PersonModel {
    constructor(name, age) {
        this.name = name;
        this.age = parseInt(age, 10); // Ensure age is stored as a number
    }

    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }

    toString() {
        return `${this.name} (${this.age})`;
    }
}

module.exports = PersonModel;