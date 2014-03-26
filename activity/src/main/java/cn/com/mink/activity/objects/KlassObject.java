package cn.com.mink.activity.objects;

import cn.com.mink.activity.ASObject;

import java.util.Map;

/**
 * @author malongbo
 */
public class KlassObject extends ASObject {

    protected KlassObject(Map<String, Object> maps) {
        super(maps);
    }

    public static KlassObjectBuilder makeKlass() {
        return new KlassObjectBuilder();
    }

    public static final class KlassObjectBuilder extends Builder<KlassObject, KlassObjectBuilder> {
        private KlassObject klassObject;

        public KlassObjectBuilder() {
            objectType("klass");
            klassObject = new KlassObject(getMaps());
        }

        public KlassObject getMe() { return klassObject; }
    }
}
