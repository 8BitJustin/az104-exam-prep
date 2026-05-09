// ─────────────────────────────────────────────────────────────────────────────
// AZ-104 Question Bank
// ─────────────────────────────────────────────────────────────────────────────
// Structure:
//   - Each domain object contains: domain name, domainId, color, icon, questions[]
//   - Each question contains: id, q, options[], answer (index), explanation
//
// To add questions: find the correct domain and add a new object to its
// questions[] array. Follow the existing format. The app will automatically
// include new questions in the random pool.
// ─────────────────────────────────────────────────────────────────────────────

export const questionBank = [

  // ── DOMAIN 1: Identities & Governance (20–25%) ────────────────────────────
  {
    domain: "Manage Azure Identities & Governance",
    domainId: 1,
    color: "#00B4D8",
    icon: "🪪",
    questions: [
      {
        id: "1a",
        q: "A user was deleted from Microsoft Entra ID 20 days ago. A manager requests the account be restored. What should you do?",
        options: [
          "Restore the user from the Deleted Users blade in Entra ID",
          "Re-create the user manually with the same UPN",
          "Open a Microsoft support ticket to recover the account",
          "The account cannot be recovered after deletion",
        ],
        answer: 0,
        explanation:
          "Deleted users remain in a soft-deleted state for 30 days in Entra ID and can be restored from the Deleted Users blade. After 30 days they are permanently purged and cannot be recovered.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1b",
        q: "You need to ensure that only users in the 'Engineering' department are automatically added to a security group. Which group type and membership should you use?",
        options: [
          "Microsoft 365 group with Assigned membership",
          "Security group with Dynamic User membership",
          "Security group with Assigned membership",
          "Distribution group with Dynamic Device membership",
        ],
        answer: 1,
        explanation:
          "Dynamic User membership on a Security group uses rules (e.g., user.department -eq 'Engineering') to automatically add/remove members. This requires Entra ID P1 or P2 licensing.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1c",
        q: "You assign the Contributor role to a user at the Resource Group scope. What can this user do?",
        options: [
          "Manage all resources in the resource group but cannot manage access",
          "Read all resources across the entire subscription",
          "Create and delete resources anywhere in the subscription",
          "Manage access and resources within the resource group",
        ],
        answer: 0,
        explanation:
          "Contributor grants full access to manage resources but does NOT allow managing role assignments (access). Owner is needed to manage access. RBAC at the Resource Group scope applies only within that group.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1d",
        q: "An Azure Policy with the 'Deny' effect is assigned to a subscription. A user tries to create a non-compliant resource. What happens?",
        options: [
          "The resource is created but flagged as non-compliant",
          "The resource creation is blocked immediately",
          "An alert is triggered but creation is allowed",
          "The resource is quarantined for 24 hours then deleted",
        ],
        answer: 1,
        explanation:
          "The Deny effect prevents the request from completing. The resource is not created. This is different from Audit (logs non-compliance but allows creation) and DeployIfNotExists (deploys a remediation resource).",
        addedInVersion: "1.0.0",
      },
      {
        id: "1e",
        q: "You place a ReadOnly lock on a resource group containing a storage account. What is the effect?",
        options: [
          "No one can read or write to the storage account",
          "Users can read but cannot create, update, or delete resources",
          "Only administrators can modify resources",
          "The lock applies to future resources but not existing ones",
        ],
        answer: 1,
        explanation:
          "A ReadOnly lock prevents create, update, and delete operations. Read operations still work. Even subscription Owners cannot modify locked resources without first removing the lock.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1f",
        q: "What is the maximum number of days a soft-deleted user can be restored in Microsoft Entra ID?",
        options: ["7 days", "14 days", "30 days", "90 days"],
        answer: 2,
        explanation:
          "Entra ID retains soft-deleted users for exactly 30 days. During this window, the account — including its group memberships and properties — can be fully restored.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1g",
        q: "You need to allow a team member to view resources in a subscription but not make any changes. Which built-in RBAC role should you assign?",
        options: ["Contributor", "Owner", "Reader", "User Access Administrator"],
        answer: 2,
        explanation:
          "Reader grants read-only access across all resource types within the assigned scope. Contributor adds write/delete. Owner adds access management. User Access Administrator manages role assignments specifically.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1h",
        q: "Which Azure Policy effect should you use if you want to log non-compliant resources without blocking their creation?",
        options: ["Deny", "Append", "Audit", "Modify"],
        answer: 2,
        explanation:
          "Audit evaluates resources and logs non-compliance to the Activity Log without preventing the operation. Use Deny to block, DeployIfNotExists to auto-remediate, and Append to add fields to requests.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1i",
        q: "A resource tag strategy is required for all new resources. You want to automatically add a missing 'CostCenter' tag without blocking deployments. Which policy effect is best?",
        options: ["Deny", "Audit", "Append", "Modify"],
        answer: 3,
        explanation:
          "Modify is used to add, update, or remove properties (including tags) on resources during create or update operations. Append adds fields to the request payload but Modify is the correct effect specifically for tags on existing and new resources.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1j",
        q: "VNet A is peered with VNet B. VNet B is peered with VNet C. Can a VM in VNet A communicate with a VM in VNet C by default?",
        options: [
          "Yes, peering is transitive by default",
          "No, VNet peering is not transitive",
          "Yes, if both peerings have 'Allow forwarded traffic' enabled",
          "Only if VNet B has IP forwarding enabled on its NIC",
        ],
        answer: 1,
        explanation:
          "VNet peering is NOT transitive. A↔B and B↔C does not give A↔C connectivity. To route between non-peered VNets you need a hub-spoke topology with Azure Firewall or a Network Virtual Appliance, or direct A↔C peering.",
        addedInVersion: "1.0.0",
      },
    ],
  },

  // ── DOMAIN 2: Storage (15–20%) ─────────────────────────────────────────────
  {
    domain: "Implement & Manage Storage",
    domainId: 2,
    color: "#06D6A0",
    icon: "💾",
    questions: [
      {
        id: "2a",
        q: "You need storage that replicates data synchronously across three availability zones in the same region. Which redundancy option should you choose?",
        options: [
          "Locally Redundant Storage (LRS)",
          "Geo-Redundant Storage (GRS)",
          "Zone-Redundant Storage (ZRS)",
          "Geo-Zone-Redundant Storage (GZRS)",
        ],
        answer: 2,
        explanation:
          "ZRS synchronously replicates data across 3 availability zones within one region, providing 99.9999999999% (12 9s) durability. LRS keeps 3 copies in one datacenter. GRS replicates to a secondary region. GZRS combines zone and geo redundancy.",
        addedInVersion: "1.0.0",
      },
      {
        id: "2b",
        q: "A blob has not been accessed in 90 days. You want it to automatically move to Archive tier. What should you configure?",
        options: [
          "Immutability policy",
          "Lifecycle management policy",
          "SAS token with expiry",
          "Object replication policy",
        ],
        answer: 1,
        explanation:
          "Blob lifecycle management policies define rules to automatically transition blobs between access tiers (Hot→Cool→Archive) or delete them based on age or last-modified/last-accessed conditions.",
        addedInVersion: "1.0.0",
      },
      {
        id: "2c",
        q: "You need to grant a vendor time-limited read access to a specific blob container without sharing your account key. What is the best approach?",
        options: [
          "Create a new storage account for the vendor",
          "Add the vendor as a Contributor on the storage account",
          "Generate a Shared Access Signature (SAS) token",
          "Enable anonymous public access on the container",
        ],
        answer: 2,
        explanation:
          "A SAS token provides delegated, time-limited access to specific resources with defined permissions. It avoids sharing account keys and can be revoked by rotating the key it was signed with. Anonymous access is too broad and has no expiry.",
        addedInVersion: "1.0.0",
      },
      {
        id: "2d",
        q: "What is the difference between RA-GRS and GRS storage redundancy?",
        options: [
          "RA-GRS replicates to 3 regions; GRS replicates to 2",
          "RA-GRS allows read access from the secondary region; GRS does not",
          "RA-GRS uses synchronous replication; GRS uses asynchronous",
          "There is no difference — they are the same SKU",
        ],
        answer: 1,
        explanation:
          "Both GRS and RA-GRS replicate asynchronously to a paired secondary region. The key difference: RA-GRS (Read-Access GRS) allows read operations from the secondary endpoint at all times. GRS only allows failover to the secondary during a regional outage.",
        addedInVersion: "1.0.0",
      },
      {
        id: "2e",
        q: "A company needs to prevent blobs from being deleted or modified for regulatory compliance for 7 years. What should you configure?",
        options: [
          "Soft delete with 7-year retention",
          "Lifecycle management policy",
          "WORM immutability policy (time-based retention)",
          "Azure Backup for blob storage",
        ],
        answer: 2,
        explanation:
          "WORM (Write Once Read Many) immutability policies enforce that blobs cannot be modified or deleted for the specified retention period. This is the correct solution for regulatory compliance (SEC 17a-4, FINRA, etc.).",
        addedInVersion: "1.0.0",
      },
      {
        id: "2f",
        q: "You want to mount an Azure storage share on an on-premises Windows server and sync files bidirectionally. Which service supports this?",
        options: [
          "Azure Blob Storage with NFS",
          "Azure File Sync",
          "Azure Data Box",
          "Azure Import/Export service",
        ],
        answer: 1,
        explanation:
          "Azure File Sync extends on-premises Windows Server file shares to Azure. It enables bidirectional sync, cloud tiering (less-used files stored only in Azure), and multi-site sync across multiple servers.",
        addedInVersion: "1.0.0",
      },
      {
        id: "2g",
        q: "Which blob type is optimized for append operations, such as logging?",
        options: ["Block blob", "Page blob", "Append blob", "Archive blob"],
        answer: 2,
        explanation:
          "Append blobs are optimized for append operations. Data can only be added to the end of the blob, making them ideal for logging scenarios. Block blobs are general-purpose. Page blobs are used for VHD/disk files.",
        addedInVersion: "1.0.0",
      },
      {
        id: "2h",
        q: "You need to restrict access to a storage account so only resources within a specific VNet subnet can connect. What should you configure?",
        options: [
          "Shared Access Signature with IP restriction",
          "Storage account firewall with a VNet service endpoint",
          "Private Link for the storage account",
          "NSG on the storage account",
        ],
        answer: 1,
        explanation:
          "Configuring a VNet service endpoint on the subnet and adding that subnet to the storage account firewall restricts access to traffic from that subnet. Private Link is more secure (private IP) but more complex. NSGs don't apply directly to storage accounts.",
        addedInVersion: "1.0.0",
      },
    ],
  },

  // ── DOMAIN 3: Compute (20–25%) ─────────────────────────────────────────────
  {
    domain: "Deploy & Manage Azure Compute",
    domainId: 3,
    color: "#FFB703",
    icon: "⚙️",
    questions: [
      {
        id: "3a",
        q: "You need to resize a running Azure VM. What must you do first?",
        options: [
          "Create a VM snapshot before resizing",
          "Deallocate the VM, then resize",
          "Resize is applied live with no downtime",
          "Delete and redeploy the VM with the new size",
        ],
        answer: 1,
        explanation:
          "To resize a VM to a size in a different cluster, you must first deallocate it. This releases the hardware and allows Azure to place it on a host that supports the new size. Some same-family resizes can happen without deallocation but it's not guaranteed.",
        addedInVersion: "1.0.0",
      },
      {
        id: "3b",
        q: "What is the key difference between an Availability Set and an Availability Zone?",
        options: [
          "Availability Sets span multiple regions; Availability Zones do not",
          "Availability Sets distribute VMs across fault/update domains in one datacenter; Zones are physically separate datacenters",
          "Availability Zones are free; Availability Sets cost extra",
          "Availability Sets require a load balancer; Zones do not",
        ],
        answer: 1,
        explanation:
          "Availability Sets protect against rack-level failures within a single datacenter using fault domains and update domains. Availability Zones are physically separate datacenters within a region, protecting against full datacenter failure. Zones offer higher SLA (99.99% vs 99.95%).",
        addedInVersion: "1.0.0",
      },
      {
        id: "3c",
        q: "You deploy a web app to a staging deployment slot and want to push it to production. What operation should you perform?",
        options: [
          "Delete the production slot and rename staging",
          "Use the Swap operation between staging and production slots",
          "Copy the app files from staging to production manually",
          "Restart the production slot to pick up the staging configuration",
        ],
        answer: 1,
        explanation:
          "Slot swap exchanges the content and configuration between two slots with zero downtime. Slot-specific settings (like connection strings marked as 'slot setting') stay with their slot; non-slot settings travel with the app on swap.",
        addedInVersion: "1.0.0",
      },
      {
        id: "3d",
        q: "Which Azure service lets you run a containerized application without managing any underlying VMs or clusters?",
        options: [
          "Azure Kubernetes Service (AKS)",
          "Azure Virtual Machine Scale Sets",
          "Azure Container Instances (ACI)",
          "Azure App Service (Docker)",
        ],
        answer: 2,
        explanation:
          "Azure Container Instances (ACI) is a serverless container service — you specify the image and resources, and Azure runs it with no VM or cluster to manage. AKS is a managed Kubernetes service that still requires node pools.",
        addedInVersion: "1.0.0",
      },
      {
        id: "3e",
        q: "What is the difference between Azure Backup and Azure Site Recovery?",
        options: [
          "Backup is for VMs only; Site Recovery supports databases too",
          "Backup protects against data loss; Site Recovery enables disaster recovery failover to another region",
          "They are the same service with different pricing tiers",
          "Site Recovery creates daily snapshots; Backup does continuous replication",
        ],
        answer: 1,
        explanation:
          "Azure Backup protects against data loss by creating recovery points you can restore from. Azure Site Recovery (ASR) is a DR solution that continuously replicates VMs to a secondary region, enabling failover if the primary region fails.",
        addedInVersion: "1.0.0",
      },
      {
        id: "3f",
        q: "A VM Scale Set is configured to scale out when CPU > 70% for 5 minutes. CPU spikes to 85% for 3 minutes then drops to 60%. What happens?",
        options: [
          "A new instance is added immediately",
          "No new instance is added — the threshold wasn't sustained long enough",
          "An alert fires but no scaling occurs",
          "The scale set reduces instance count due to the drop",
        ],
        answer: 1,
        explanation:
          "Autoscale rules require the metric condition to be sustained for the full evaluation window (5 minutes in this case). A 3-minute spike does not trigger scale-out. This cooldown/window behavior prevents thrashing.",
        addedInVersion: "1.0.0",
      },
      {
        id: "3g",
        q: "Which App Service plan tier is required to use deployment slots?",
        options: ["Free (F1)", "Shared (D1)", "Basic (B1)", "Standard (S1) or higher"],
        answer: 3,
        explanation:
          "Deployment slots are available starting at Standard (S1) tier and above. Free and Shared tiers don't support slots. Basic supports custom domains/SSL but not slots. Standard is the minimum for slots, autoscale, and Traffic Manager integration.",
        addedInVersion: "1.0.0",
      },
      {
        id: "3h",
        q: "You need to run a background job in Azure that executes on a schedule without managing servers. Which service is most appropriate?",
        options: [
          "Azure Virtual Machine with Task Scheduler",
          "Azure Functions with a Timer trigger",
          "Azure Container Instances with a restart policy",
          "Azure App Service WebJobs on Free tier",
        ],
        answer: 1,
        explanation:
          "Azure Functions with a Timer trigger provides serverless, schedule-based execution using cron expressions. You pay only for execution time. No VMs or servers to manage. WebJobs work but require an App Service Plan running continuously.",
        addedInVersion: "1.0.0",
      },
    ],
  },

  // ── DOMAIN 4: Virtual Networking (25–30%) ──────────────────────────────────
  {
    domain: "Configure & Manage Virtual Networking",
    domainId: 4,
    color: "#E040FB",
    icon: "🌐",
    questions: [
      {
        id: "4a",
        q: "An NSG rule has priority 100 to Allow HTTP (port 80) and priority 200 to Deny HTTP (port 80). What is the result for HTTP traffic?",
        options: [
          "Traffic is denied because Deny overrides Allow",
          "Traffic is allowed because the lower priority number is evaluated first",
          "Both rules cancel each other and traffic is blocked",
          "The most recently created rule takes precedence",
        ],
        answer: 1,
        explanation:
          "NSG rules are evaluated in priority order — lower number = higher priority. Priority 100 (Allow) is evaluated before priority 200 (Deny). Once a rule matches, processing stops. So HTTP traffic is allowed.",
        addedInVersion: "1.0.0",
      },
      {
        id: "4b",
        q: "You need VMs in two VNets in different regions to communicate. What should you configure?",
        options: [
          "VNet-to-VNet VPN Gateway connection",
          "Global VNet Peering",
          "Express Route with Microsoft Peering",
          "Service Endpoints between the VNets",
        ],
        answer: 1,
        explanation:
          "Global VNet Peering extends VNet peering across Azure regions using Microsoft's backbone network. It's lower cost and lower latency than VPN Gateways for VNet-to-VNet connectivity. Service Endpoints don't connect VNets.",
        addedInVersion: "1.0.0",
      },
      {
        id: "4c",
        q: "You create a Private DNS Zone 'internal.contoso.com' and link it to a VNet with auto-registration enabled. A new VM named 'webvm' is deployed to that VNet. What record is automatically created?",
        options: [
          "A CNAME record pointing webvm to its public IP",
          "An A record mapping webvm.internal.contoso.com to the VM's private IP",
          "An MX record for mail delivery to webvm",
          "No record is created — auto-registration requires manual trigger",
        ],
        answer: 1,
        explanation:
          "When auto-registration is enabled on a VNet link, Azure automatically creates A records for VMs deployed in that VNet, mapping hostname.zone to the VM's private IP. This eliminates manual DNS record management.",
        addedInVersion: "1.0.0",
      },
      {
        id: "4d",
        q: "What does Azure Application Gateway provide that a Standard Load Balancer does not?",
        options: [
          "Support for TCP and UDP traffic",
          "Layer 7 routing, SSL termination, and WAF capabilities",
          "Availability Zone support",
          "Backend health probes",
        ],
        answer: 1,
        explanation:
          "Application Gateway operates at Layer 7 (HTTP/HTTPS) and supports URL path-based routing, cookie-based session affinity, SSL/TLS termination, and an optional Web Application Firewall (WAF). Standard Load Balancer is Layer 4 (TCP/UDP) only.",
        addedInVersion: "1.0.0",
      },
      {
        id: "4e",
        q: "Which tool in Network Watcher tells you whether an NSG rule is blocking traffic between two specific IP addresses?",
        options: [
          "Connection Monitor",
          "Next Hop",
          "IP Flow Verify",
          "NSG Flow Logs",
        ],
        answer: 2,
        explanation:
          "IP Flow Verify tests whether traffic is allowed or denied for a specific direction, protocol, local/remote IP, and port — and identifies which NSG rule is making that decision. Next Hop shows routing path. Flow Logs capture actual traffic data.",
        addedInVersion: "1.0.0",
      },
      {
        id: "4f",
        q: "What is the default outbound port for HTTPS, and which NSG default rule allows outbound internet traffic?",
        options: [
          "Port 443; AllowInternetOutBound (priority 65001)",
          "Port 443; AllowVnetOutBound (priority 65000)",
          "Port 8443; AllowInternetOutBound (priority 65001)",
          "Port 443; there is no default outbound allow rule",
        ],
        answer: 0,
        explanation:
          "HTTPS uses port 443. NSGs have a default outbound rule 'AllowInternetOutBound' at priority 65001 that permits all outbound traffic to the internet. 'AllowVnetOutBound' at 65000 allows intra-VNet traffic. 'DenyAllOutBound' at 65500 blocks everything else.",
        addedInVersion: "1.0.0",
      },
      {
        id: "4g",
        q: "You need to prevent all internet outbound traffic from a subnet while still allowing traffic to Azure Storage. What combination should you use?",
        options: [
          "NSG deny rule + VNet service endpoint for Storage",
          "Route table with default route to a firewall + storage service endpoint",
          "Azure Firewall only",
          "NSG deny rule + Private Endpoint for Storage",
        ],
        answer: 0,
        explanation:
          "An NSG outbound Deny rule for the Internet service tag blocks internet traffic. A service endpoint for Azure Storage on the subnet allows traffic to storage over the Microsoft backbone, bypassing the internet entirely.",
        addedInVersion: "1.0.0",
      },
      {
        id: "4h",
        q: "What is the minimum subnet size required for an Azure VPN Gateway subnet?",
        options: ["/29", "/28", "/27", "/26"],
        answer: 2,
        explanation:
          "Microsoft recommends a /27 (32 addresses) or larger for the GatewaySubnet to accommodate future gateway additions and VPN/ExpressRoute coexistence. A /29 is the absolute minimum but is not recommended for production.",
        addedInVersion: "1.0.0",
      },
      {
        id: "4i",
        q: "A VM in a VNet cannot reach the internet despite having a public IP. The NSG shows no deny rules. What should you check next?",
        options: [
          "Verify the VM's OS firewall isn't blocking outbound traffic",
          "Check if a User Defined Route (UDR) is sending traffic to a next hop that doesn't route to internet",
          "Confirm the VM has a DNS server configured",
          "Check if the storage account has a firewall enabled",
        ],
        answer: 1,
        explanation:
          "A User Defined Route (UDR) with a 0.0.0.0/0 next hop pointing to a virtual appliance or 'None' overrides the default system route to the internet. Even with a public IP and no NSG blocks, a UDR can black-hole outbound traffic.",
        addedInVersion: "1.0.0",
      },
    ],
  },

  // ── DOMAIN 5: Monitor & Maintain (10–15%) ─────────────────────────────────
  {
    domain: "Monitor & Maintain Azure Resources",
    domainId: 5,
    color: "#FF6B6B",
    icon: "📊",
    questions: [
      {
        id: "5a",
        q: "You want to receive an email when a VM's CPU exceeds 80% for more than 5 minutes. What two things must you configure?",
        options: [
          "A diagnostic setting and a Log Analytics query",
          "An alert rule with a metric condition and an action group with email",
          "A workbook and a scheduled export",
          "Azure Security Center and email notification",
        ],
        answer: 1,
        explanation:
          "Alert rules define the condition (metric: CPU > 80%, evaluation window: 5 min). Action groups define what happens when the alert fires (email, SMS, webhook, ITSM, etc.). Both are required — the alert detects, the action group notifies.",
        addedInVersion: "1.0.0",
      },
      {
        id: "5b",
        q: "Which KQL operator would you use to filter a Log Analytics query to only show events from the last 24 hours?",
        options: [
          "| where TimeGenerated > now() - 24h",
          "| filter time > -24h",
          "| select TimeGenerated last 24h",
          "| top 24 by TimeGenerated",
        ],
        answer: 0,
        explanation:
          "In KQL, 'where TimeGenerated > now() - 24h' correctly filters results to the past 24 hours. KQL uses pipe-based syntax. 'filter' is not a valid KQL operator. 'select' and 'top' serve different purposes.",
        addedInVersion: "1.0.0",
      },
      {
        id: "5c",
        q: "What is the purpose of an Azure Monitor Action Group?",
        options: [
          "To define the metric thresholds that trigger an alert",
          "To define the notification and automation actions taken when an alert fires",
          "To group related Azure resources for monitoring",
          "To collect logs from multiple resources into one workspace",
        ],
        answer: 1,
        explanation:
          "Action groups contain one or more actions (email, SMS, voice, webhook, Azure Function, Logic App, ITSM) that execute when associated alert rules fire. Multiple alert rules can share a single action group.",
        addedInVersion: "1.0.0",
      },
      {
        id: "5d",
        q: "You need to query logs from multiple Azure resources in one place. What should you deploy first?",
        options: [
          "Azure Monitor Metrics Dashboard",
          "Application Insights component",
          "Log Analytics Workspace",
          "Azure Data Explorer cluster",
        ],
        answer: 2,
        explanation:
          "A Log Analytics Workspace is the central repository for log data. Resources (VMs, NSGs, Activity Log, etc.) send diagnostic data to the workspace, where you query it using KQL. Application Insights is built on top of Log Analytics but is scoped to application telemetry.",
        addedInVersion: "1.0.0",
      },
      {
        id: "5e",
        q: "IP Flow Verify in Network Watcher reports that traffic is 'Denied' by a rule. Where does this rule exist?",
        options: [
          "In the Azure Firewall policy",
          "In an NSG associated with the NIC or subnet",
          "In the route table attached to the subnet",
          "In the VNet's DDoS protection plan",
        ],
        answer: 1,
        explanation:
          "IP Flow Verify checks NSG rules on the VM's NIC and its associated subnet to determine if traffic is allowed or denied. It identifies the specific NSG and rule name responsible. Route tables affect routing, not allow/deny decisions.",
        addedInVersion: "1.0.0",
      },
      {
        id: "5f",
        q: "What does the Azure Monitor 'Heartbeat' table in Log Analytics indicate?",
        options: [
          "The CPU heartbeat of a VM at regular intervals",
          "That the Azure Monitor Agent on a VM is running and communicating with the workspace",
          "Inbound network pulses to detect DDoS activity",
          "Storage account health check responses",
        ],
        answer: 1,
        explanation:
          "The Heartbeat table receives records every minute from VMs with the Azure Monitor Agent (or legacy MMA). Absence of heartbeats indicates the agent is down or the VM is offline. It's commonly used to monitor VM availability.",
        addedInVersion: "1.0.0",
      },
      {
        id: "5g",
        q: "Which Azure service provides detailed flow logs showing which IP addresses and ports are communicating through an NSG?",
        options: [
          "Azure Monitor Metrics",
          "Network Watcher NSG Flow Logs",
          "IP Flow Verify",
          "Azure Traffic Analytics",
        ],
        answer: 1,
        explanation:
          "NSG Flow Logs capture information about IP traffic flowing through NSGs, including source/destination IP, port, protocol, and whether the traffic was allowed or denied. They are stored in a storage account and can be analyzed with Traffic Analytics.",
        addedInVersion: "1.0.0",
      },
      {
        id: "5h",
        q: "You want to visualize data from multiple Log Analytics queries in a single view that can be shared with your team. What should you create?",
        options: [
          "An Azure Dashboard with metric tiles",
          "A Log Analytics saved search",
          "An Azure Monitor Workbook",
          "An Application Insights availability test",
        ],
        answer: 2,
        explanation:
          "Azure Monitor Workbooks provide rich, interactive reports combining text, KQL queries, metrics, and parameters into a shareable document. Dashboards are simpler pinned tiles. Workbooks are better for detailed, multi-section operational reports.",
        addedInVersion: "1.0.0",
      },
    ],
  },
];
