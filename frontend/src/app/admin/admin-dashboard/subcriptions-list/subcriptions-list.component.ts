import { Component, OnInit } from "@angular/core";
import { AdminServService } from "../admin-serv.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-subcriptions-list",
  templateUrl: "./subcriptions-list.component.html",
  styleUrls: ["./subcriptions-list.component.scss"]
})
export class SubcriptionsListComponent implements OnInit {
  salonSubscriptionsList: any;
  isLoader: boolean;
  convertedSalonSubscriptionList: any;
  salonSubscriptionCount: any;
  displayedColumns = ["name", "startdate", "enddate"];
  noRecordsFound: boolean;
  pageSize: any = 5;
  count: any = 5;
  adminCategoriesCount: any;
  page: any = 1;
  constructor(
    private adminServ: AdminServService,
    private toastServ: ToastrService
  ) {}

  ngOnInit() {
    this.adminServ.setHeaderText("Salons Subscribed List");

    this.getSubscribedSalonsList();
  }
  paginate(event) {
    //console.log(event);
    this.page = event.pageIndex + 1;
    //  console.log("c", this.count);
    // console.log("p", this.page);
    this.count = event.pageSize;
    this.getSubscribedSalonsList();
  }

  getSubscribedSalonsList() {
    this.isLoader = true;
    let dataToPass = {
      type: "subscriptions",
      pageSize: this.count,
      page: this.page
    };
    this.adminServ.getSalonSubscriptionList(dataToPass).subscribe(
      (data: any) => {
        if (data["code"] === 200) {
          this.isLoader = false;
          this.salonSubscriptionsList = data["data"]["salons"];

          this.salonSubscriptionsList.forEach(function(c) {
            var months_arr = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ];
            var expiryDate = new Date(c.expiry_date * 1000);
            var expiry_year = expiryDate.getFullYear();
            var expiry_month = months_arr[expiryDate.getMonth()];
            var expiry_date = expiryDate.getDate();
            var finalExpiryDate =
              expiry_date + "-" + expiry_month + "-" + expiry_year;
            var susbcribedDate = new Date(c.created_on * 1000);
            var subscribe_year = susbcribedDate.getFullYear();
            var subscribe_month = months_arr[susbcribedDate.getMonth()];
            var subscribe_date = susbcribedDate.getDate();
            var finalSubscribedDate =
              subscribe_date + "-" + subscribe_month + "-" + subscribe_year;
            c.created_on = finalSubscribedDate;
            c.expiry_date = finalExpiryDate;
          });

          this.convertedSalonSubscriptionList = this.salonSubscriptionsList;

          this.salonSubscriptionCount = data["data"]["count"];

          this.toastServ.success("Fetched Subscribed Salons", "", {
            timeOut: 1000
          });
        } else if (data["code"] === 400) {
          this.isLoader = false;
          this.toastServ.error("Failed to fetch", data["message"], {
            timeOut: 1000
          });
        }
      },
      error => {
        this.isLoader = false;
        this.toastServ.error("Server- Error", error.error, {
          timeOut: 1000
        });
      }
    );
  }
}
