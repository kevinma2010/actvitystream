package cn.com.mink.activity.objects;

import cn.com.mink.activity.ASObject;

import java.util.Map;

/**
 * @author malongbo
 */
public class GroupObject extends ASObject {

    protected GroupObject(Map<String, Object> maps) {
        super(maps);
    }

    public static GroupObjectBuilder makeGroup() {
        return new GroupObjectBuilder();
    }

    public static final class GroupObjectBuilder extends Builder<GroupObject, GroupObjectBuilder> {
        private GroupObject groupObject;

        public GroupObjectBuilder() {
            objectType("group");
            groupObject = new GroupObject(getMaps());
        }

        public GroupObject getMe() { return groupObject; }
    }
}
