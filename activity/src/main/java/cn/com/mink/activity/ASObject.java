package cn.com.mink.activity;

import java.util.HashMap;
import java.util.Map;

/**
 * @author malongbo
 */
public class ASObject {

    public static final String ATTACHMENTS = "attachments";
    public static final String AUTHOR = "author";
    public static final String CONTENT = "content";
    public static final String DISPLAYNAME = "displayName";
    public static final String DOWNSTREAMDUPLICATES = "downstreamDuplicates";
    public static final String ID = "id";
    public static final String IMAGE = "image";
    public static final String OBJECTTYPE = "objectType";
    public static final String PUBLISHED = "published";
    public static final String SUMMARY = "summary";
    public static final String UPDATED = "updated";
    public static final String UPSTREAMDUPLICATES = "upstreamDuplicates";
    public static final String URL = "url";
    public static final String REACTIONS = "reactions";

    public static final String INREPLYTO = "inReplyTo";
    public static final String LOCATION = "location";
    public static final String SOURCE = "source";
    public static final String MOOD = "mood";
    public static final String TAGS = "tags";
    public static final String RATING = "rating";

    public static final String EMBED = "embed";

    private final Map<String, Object> maps;

    public ASObject(Map<String, Object> maps) {
        this.maps = maps;
    }

    public Object get(String name) {
        return maps.get(name);
    }

    public Object getObjectType() {
        return get(OBJECTTYPE);
    }

    public Object getDisplayName() {
        return get(DISPLAYNAME);
    }

    public Object getId() {
        return get(ID);
    }

    public static ASObjectBuilder makeObject(String objectType) {
        return new ASObjectBuilder(objectType);
    }

    public static final class ASObjectBuilder extends Builder<ASObject, ASObjectBuilder> {
        private ASObject object;

        public ASObjectBuilder(String objectType) {
            objectType(objectType);
            object = new ASObject(getMaps());
        }

        public ASObject getMe() { return object; }
    }

    public static abstract class Builder<X extends ASObject, M extends Builder<X,M>> {

        private final Map<String, Object> maps = new HashMap<String, Object>();

        protected Map<String, Object> getMaps() {
            return maps;
        }

        public M set(String name, Object val) {
            maps.put(name, val);
            return (M) this;
        }

        public M id(String id) {
            set(ID, id);
            return (M) this;
        }

        public M displayName(String displayName) {
            set(DISPLAYNAME, displayName);
            return (M) this;
        }

        public M objectType(String objectType) {
            set(OBJECTTYPE, objectType);
            return (M) this;
        }
    }
}
