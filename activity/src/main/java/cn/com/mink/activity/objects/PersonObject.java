package cn.com.mink.activity.objects;

import cn.com.mink.activity.ASObject;

import java.util.Map;

/**
 * @author malongbo
 */
public class PersonObject extends ASObject {

    protected PersonObject(Map<String, Object> maps) {
        super(maps);
    }

    public static PersonObjectBuilder makePerson(String name) {
        return new PersonObjectBuilder(name);
    }

    public static final class PersonObjectBuilder extends Builder<PersonObject,PersonObjectBuilder> {
        private PersonObject personObject;

        public PersonObjectBuilder(String name) {
            objectType("person");
            displayName(name);
            personObject = new PersonObject(getMaps());
        }

        public PersonObject getMe() {
            return personObject;
        }
    }


}
