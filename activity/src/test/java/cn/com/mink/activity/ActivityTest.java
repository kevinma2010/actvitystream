package cn.com.mink.activity;

import cn.com.mink.activity.objects.PersonObject;
import com.alibaba.fastjson.JSON;
//import org.junit.Test;

/**
 * @author malongbo
 */
public class ActivityTest {

//    @Test
    public void testMakeFrient() {
        Activity makeFrientActivity = Activity.makeActivity().actor(PersonObject.makePerson("lenbo").getMe())
                .object(PersonObject.makePerson("tingting").getMe())
                .verb(Verb.MAKE_FRIEND).getMe();

        String makeFrientActivityJSON = JSON.toJSONString(makeFrientActivity);

        System.out.println(makeFrientActivityJSON);

        System.out.println();
    }
}
