import Sidebar from "../component/SidebarComponent"
import Header from "../component/HeaderComponent"

export default function() {
  return (
    <div style={{ display: 'flex' }}>
        <div>
          <Sidebar />
        </div>
        <div style={{ flex: 1 }}>
          <Header />
        </div>
    </div>
  );
};
