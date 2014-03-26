package cn.com.mink.activity;

import java.util.Map;

/**
 * @author malongbo
 */
public class Activity extends ASObject {

    public static final String ACTOR = "actor";
    public static final String CONTENT = "content";
    public static final String GENERATOR = "generator";
    public static final String ICON = "icon";
    public static final String ID = "id";
    public static final String OBJECT = "object";
    public static final String PUBLISHED = "published";
    public static final String PROVIDER = "provider";
    public static final String TARGET = "target";
    public static final String TITLE = "title";
    public static final String UPDATED = "updated";
    public static final String URL = "url";
    public static final String VERB = "verb";

    public Activity(Map<String, Object> maps) {
        super(maps);
    }

    public static final ActivityBuilder makeActivity() {
        return new ActivityBuilder("activity");
    }

    public Object getVerb() {
        return get(VERB);
    }

    public Object getActor() {
        return get(ACTOR);
    }


    public Object getObject() {
        return get(OBJECT);
    }

    public Object getObjectType() {
        return get(OBJECTTYPE);
    }

    public Object getTarget() {
        return get(TARGET);
    }

    public Object getContent() {
        return get(CONTENT);
    }

    public Object getTitle() {
        return get(TITLE);
    }

    public Object getAuthor() {
        return get(AUTHOR);
    }



    public static final class ActivityBuilder extends Builder<Activity, ActivityBuilder> {
        private Activity activity;

        public ActivityBuilder(String objectType) {
            activity = new Activity(getMaps());
            objectType(objectType);
        }

        public Activity getMe() {
            return activity;
        }

        public ActivityBuilder verb(String verb) {
            return set(VERB, verb);
        }

        public ActivityBuilder actor(ASObject actor) {
            return set(ACTOR, actor);
        }

        public ActivityBuilder object(ASObject object) {
            return set(OBJECT, object);
        }

        public ActivityBuilder target(ASObject target) {
            return set(TARGET, target);
        }

        public ActivityBuilder content(ASObject content) {
            return set(CONTENT, content);
        }

        public ActivityBuilder title(String title) {
            return set(TITLE, title);
        }

        public ActivityBuilder author(String author) {
            return set(AUTHOR, author);
        }
    }
}
