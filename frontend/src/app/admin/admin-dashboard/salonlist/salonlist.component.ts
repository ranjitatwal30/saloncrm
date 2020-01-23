import { Component, OnInit } from "@angular/core";
import { AdminServService } from "../admin-serv.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-salonlist",
  templateUrl: "./salonlist.component.html",
  styleUrls: ["./salonlist.component.scss"]
})
export class SalonlistComponent implements OnInit {
  activeSalons: any;
  noRecordsFound: boolean;
  displayedColumns = [
    "name",
    "salonaddress",
    "contact",
    "opentime",
    "closetime",
    "isactive",
    "action"
  ];

  limit: any = 0;
  count: any = 5;
  pageSize: any = 5;

  page: any = 1;
  ActiveSalonsCount: any;
  disabled: boolean = true;
  salonDetails: any;
  showSalonDetail: boolean = false;
  salonEmail: any;

  constructor(
    private adminServ: AdminServService,
    private toastrServ: ToastrService
  ) {}

  ngOnInit() {
    this.getActiveSalonsList();
    this.getActiveSalonsCount();
    this.adminServ.setHeaderText("Manage Salons");
  }

  /**
   * Function is use to Fetch Active salons list
   * @access private
   * @return json
   * Created by SmartData
   * @smartData Enterprises (I) Ltd
   */
  getActiveSalonsList() {
    let dataToPass = {
      type: "activesalons",
      pageSize: this.count,
      page: this.page
    };
    this.adminServ.getSalonsList(dataToPass).subscribe(
      data => {
        // console.log(data);
        // console.log("SalonsList", data["data"]);
        if (data["code"] === 200) {
          this.activeSalons = data["data"];
          if (this.activeSalons.length == 0) {
            this.noRecordsFound = true;
          }
          this.toastrServ.success("Fetched Salons List", "Success", {
            timeOut: 1000
          });
        } else {
          this.toastrServ.error("Failed To Fetch Salons", "Failed", {
            timeOut: 1000
          });
        }
      },
      error => {
        this.toastrServ.success("Server Error", error, {
          timeOut: 1000
        });
      }
    );
  }

  getActiveSalonsCount() {
    let dataToPass = {
      type: "salon"
    };
    this.adminServ.getActiveSalonsCount(dataToPass).subscribe(
      data => {
        //  console.log("DATA", data);
        if (data["code"] == 200) {
          this.ActiveSalonsCount = data["data"];
          //   console.log("ACTIVE SALONS COUNT", this.ActiveSalonsCount);
        }
      },
      error => {
        this.toastrServ.error("Server Error", error, {
          timeOut: 1000
        });
      }
    );
  }

  paginate(event) {
    //  console.log(event);
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.getActiveSalonsList();
  }

  showSalonDetails(data) {
    // console.log(data);
    let dataToPass = {
      salon_id: data._id
    };

    this.adminServ.getSalonDetails(dataToPass).subscribe((data: any) => {
      //  console.log("DSS", data);

      if (data["code"] === 200) {
        this.showSalonDetail = true;
        this.salonDetails = data["data"]["salondetail"];
        this.salonEmail = data["data"]["email"];
        if (this.salonDetails["image"] === null) {
          this.salonDetails["image"] = "../../../assets/images/profilepic.png";
        }
      } else {
        this.toastrServ.error("Failed To Fetch User Details", "Error", {
          timeOut: 1000
        });
      }
    });
  }

  closeSalonDetails() {
    this.showSalonDetail = false;
  }

  declineSalonRequest(data) {
    // console.log("ApproveFor", data);
    let dataToPass = {
      salon_id: data._id
    };
    this.adminServ.declineSalonRequest(dataToPass).subscribe(
      data => {
        // console.log("FFFF", data);
        if (data["code"] === 200) {
          this.toastrServ.success("Salon Declined Successfully", "", {
            timeOut: 3000
          });
          this.getActiveSalonsList();
          this.getActiveSalonsCount();
        } else {
          this.toastrServ.error("Failed To Decline", "", {
            timeOut: 3000
          });
        }
      },
      error => {
        this.toastrServ.error("Server Error", error, {
          timeOut: 3000
        });
      }
    );
  }
}
