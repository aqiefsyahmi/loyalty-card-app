import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Login,

  //Student
  Dashboard,
  Profile,
  Report,
  ChangePassword,
  Transaction,
  CollectPoint,
  ClaimReward,
  CashlessCampaign,
  GreenCampusCampaign,
  QRCashlessCampaign,
  QRGreenCampusCampaign,
  PINCashlessCampaign,
  PINGreenCampusCampaign,

  //Cafe Owner
  CODashboard,
  COShowQR,
  COShowPIN,
  MyQReKupon,
  MyQRCashless,
  MyQRGreenCampus,
  MyPINGeneratorCashless,
  MyPINGeneratorGreenCampus,

  //B40 Student
  B40Dashboard,
  PayNow,
  QRScan,
  PayCafeWeb,
  B40CollectPoint,
  B40ClaimReward,
  B40CashlessCampaign,
  B40GreenCampusCampaign,
  B40PINCashlessCampaign,
  B40PINGreenCampusCampaign,
  B40QRCashlessCampaign,
  B40QRGreenCampusCampaign,
} from "./pages";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { getObject } from "./helpers/asyncStorage";

const Stack = createNativeStackNavigator();
const StudentDrawer = createDrawerNavigator();
const B40StudentDrawer = createDrawerNavigator();
const CafeOwnerDrawer = createDrawerNavigator();

function StudentDrawerNavigator() {
  return (
    <StudentDrawer.Navigator
      screenOptions={{
        drawerStyle: { paddingTop: 16 },
        drawerActiveTintColor: "rgba(88, 83, 76, 1)",
        headerStyle: { backgroundColor: "#FFD400" },
      }}
    >
      <StudentDrawer.Screen
        name="DashboardDrawer" // Unique name DrawerNavigator
        component={Dashboard}
        options={{
          title: "eKuponXLoyalty@UniSZA",
          drawerLabel: "Home",
        }}
      />
      <StudentDrawer.Screen
        name="Transactions"
        component={Transaction}
        options={{
          headerTitle: "Transaction History",
          drawerLabel: "Transaction History",
        }}
      />
      <StudentDrawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: "Change password",
          drawerLabel: "Change password",
        }}
      />
      <StudentDrawer.Screen
        name="Report"
        component={Report}
        options={{
          headerTitle: "Report a problem",
          drawerLabel: "Report",
        }}
      />
    </StudentDrawer.Navigator>
  );
}

function CafeOwnerDrawerNavigator() {
  return (
    <CafeOwnerDrawer.Navigator
      screenOptions={{
        drawerStyle: { paddingTop: 16 },
        drawerActiveTintColor: "rgba(88, 83, 76, 1)",
        headerStyle: { backgroundColor: "#FFD400" },
      }}
    >
      <CafeOwnerDrawer.Screen
        name="CODashboardDrawer" // Unique name DrawerNavigator
        component={CODashboard}
        options={{
          title: "eKuponXLoyalty@UniSZA",
          drawerLabel: "Home",
        }}
      />
      <CafeOwnerDrawer.Screen
        name="Transactions"
        component={Transaction}
        options={{
          headerTitle: "Transaction History",
          drawerLabel: "Transaction History",
        }}
      />
      <CafeOwnerDrawer.Screen
        name="Profile" // Unique name DrawerNavigator
        component={Profile}
        options={{
          headerTitle: "Update profile",
          drawerLabel: "Update profile",
        }}
      />
      <CafeOwnerDrawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: "Change password",
          drawerLabel: "Change password",
        }}
      />
      <CafeOwnerDrawer.Screen
        name="Report"
        component={Report}
        options={{
          headerTitle: "Report a problem",
          drawerLabel: "Report",
        }}
      />
    </CafeOwnerDrawer.Navigator>
  );
}

function B40StudentDrawerNavigator() {
  return (
    <B40StudentDrawer.Navigator
      screenOptions={{
        drawerStyle: { paddingTop: 16 },
        drawerActiveTintColor: "rgba(88, 83, 76, 1)",
        headerStyle: { backgroundColor: "#FFD400" },
      }}
    >
      <B40StudentDrawer.Screen
        name="DashboardDrawer" // Unique name DrawerNavigator
        component={B40Dashboard}
        options={{
          title: "eKuponXLoyalty@UniSZA",
          drawerLabel: "Home",
        }}
      />
      <B40StudentDrawer.Screen
        name="Transactions"
        component={Transaction}
        options={{
          headerTitle: "Transaction History",
          drawerLabel: "Transaction History",
        }}
      />
      <B40StudentDrawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: "Change password",
          drawerLabel: "Change password",
        }}
      />
      <B40StudentDrawer.Screen
        name="Report"
        component={Report}
        options={{
          headerTitle: "Report a problem",
          drawerLabel: "Report",
        }}
      />
    </B40StudentDrawer.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState({});

  async function loadContext() {
    try {
      const userDetail = await getObject("userDetails");
      setUser(userDetail);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadContext();
  }, []);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: "#FFD400" },
            animation: "fade_from_bottom",
          }}
        >
          {!user?.isSignedIn ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              {user?.role === "NON-B40" && (
                <>
                  <Stack.Screen
                    name="Dashboard"
                    component={StudentDrawerNavigator}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CollectPoint"
                    component={CollectPoint}
                    options={{
                      headerTitle: "Collect Point",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="CashlessCampaign"
                    component={CashlessCampaign}
                    options={{
                      headerTitle: "Cashless Campaign",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="QRCashlessCampaign"
                    component={QRCashlessCampaign}
                    options={{
                      headerTitle: "Scan QR(Cashless Campaign)",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="PINCashlessCampaign"
                    component={PINCashlessCampaign}
                    options={{
                      headerTitle: "Insert PIN(Cashless Campaign)",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="GreenCampusCampaign"
                    component={GreenCampusCampaign}
                    options={{
                      headerTitle: "Green Campus Campaign",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="QRGreenCampusCampaign"
                    component={QRGreenCampusCampaign}
                    options={{
                      headerTitle: "Scan QR(Green Campus Campaign)",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="PINGreenCampusCampaign"
                    component={PINGreenCampusCampaign}
                    options={{
                      headerTitle: "Insert PIN(Green Campus Campaign)",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="ClaimReward"
                    component={ClaimReward}
                    options={{ headerTitle: "Claim Reward", headerShown: true }}
                  />
                </>
              )}

              {user?.role === "CAFE" && (
                <>
                  <Stack.Screen
                    name="CODashboard"
                    component={CafeOwnerDrawerNavigator}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="COShowQR"
                    component={COShowQR}
                    options={{ headerTitle: "My QRCode", headerShown: true }}
                  />
                  <Stack.Screen
                    name="COShowPIN"
                    component={COShowPIN}
                    options={{
                      headerTitle: "One-Time PIN Generator",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="MyQReKupon"
                    component={MyQReKupon}
                    options={{ headerTitle: "MyQR eKupon", headerShown: true }}
                  />
                  <Stack.Screen
                    name="MyQRCashless"
                    component={MyQRCashless}
                    options={{
                      headerTitle: "MyQR Cashless",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="MyQRGreenCampus"
                    component={MyQRGreenCampus}
                    options={{
                      headerTitle: "MyQR Green Campus",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="MyPINGeneratorCashless"
                    component={MyPINGeneratorCashless}
                    options={{
                      headerTitle: "OTP Generator(Cashless)",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="MyPINGeneratorGreenCampus"
                    component={MyPINGeneratorGreenCampus}
                    options={{
                      headerTitle: "OTP Generator(Green Campus)",
                      headerShown: true,
                    }}
                  />
                </>
              )}

              {user?.role === "B40" && (
                <>
                  <Stack.Screen
                    name="B40Dashboard"
                    component={B40StudentDrawerNavigator}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="PayNow"
                    component={PayNow}
                    options={{
                      headerTitle: "Choose amount",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="QRScan"
                    component={QRScan}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="PayCafeWeb"
                    component={PayCafeWeb}
                    options={{ headerTitle: "Select Cafe", headerShown: true }}
                  />
                  <Stack.Screen
                    name="B40CollectPoint"
                    component={B40CollectPoint}
                    options={{
                      headerTitle: "Collect Point",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="B40ClaimReward"
                    component={B40ClaimReward}
                    options={{ headerTitle: "Claim Reward", headerShown: true }}
                  />
                  <Stack.Screen
                    name="B40CashlessCampaign"
                    component={B40CashlessCampaign}
                    options={{
                      headerTitle: "Cashless Campaign",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="B40GreenCampusCampaign"
                    component={B40GreenCampusCampaign}
                    options={{
                      headerTitle: "Green Campus Campaign",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="B40PINCashlessCampaign"
                    component={B40PINCashlessCampaign}
                    options={{
                      headerTitle: "PIN (Cashless Campaign)",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="B40PINGreenCampusCampaign"
                    component={B40PINGreenCampusCampaign}
                    options={{
                      headerTitle: "PIN (Green Campus Campaign)",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="B40QRCashlessCampaign"
                    component={B40QRCashlessCampaign}
                    options={{
                      headerTitle: "QR (Cashless Campaign)",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name="B40QRGreenCampusCampaign"
                    component={B40QRGreenCampusCampaign}
                    options={{
                      headerTitle: "QR (Green Campus Campaign)",
                      headerShown: true,
                    }}
                  />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </UserContext.Provider>
    </NavigationContainer>
  );
}
